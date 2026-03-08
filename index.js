require('dotenv').config();

// Apply global proxy to generic Node.js HTTP/HTTPS requests
if (process.env.PROXY_URL) {
    process.env.GLOBAL_AGENT_HTTP_PROXY = process.env.PROXY_URL;
    require('global-agent/bootstrap');
}

const { TelegramClient, Api } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { NewMessage } = require('telegram/events');
const input = require('input');
const { setupNlp, getReply } = require('./nlp.js');
const { db, recordInteraction } = require('./db.js');
const http = require('http');
const net = require('net');
const url = require('url');

// --- Dummy HTTP Server for Hugging Face Healthcheck ---
const PROXY_PORT = process.env.PORT || 7860;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Telegram Userbot is running!');
});

server.listen(PROXY_PORT, () => {
    console.log(`Dummy Healthcheck Server listening on port ${PROXY_PORT}`);
});
// ------------------------------------------

const apiId = parseInt(process.env.API_ID);
const apiHash = process.env.API_HASH;
const stringSession = new StringSession(process.env.SESSION_STRING || '');

// Comma separated sticker pack URLs or IDs
const stickerPacksStr = process.env.STICKER_PACKS || '';
const stickerPacks = stickerPacksStr.split(',').filter(s => s.trim().length > 0);

// Proxy parsing for Telegram
let proxyConfig = undefined;
if (process.env.PROXY_URL) {
    console.log(`Using Proxy URL: ${process.env.PROXY_URL}`);
    const parsedProxy = new url.URL(process.env.PROXY_URL);
    proxyConfig = {
        ip: parsedProxy.hostname,
        port: parseInt(parsedProxy.port),
        socksType: parsedProxy.protocol.startsWith('socks5') ? 5 : 4,
        timeout: 2,
    };
    if (parsedProxy.username && parsedProxy.password) {
        proxyConfig.credentials = {
            username: decodeURIComponent(parsedProxy.username),
            password: decodeURIComponent(parsedProxy.password)
        };
    }
}

(async () => {
    console.log('Starting NLP setup...');
    await setupNlp();
    
    console.log('Loading interactive Telegram Client...');
    const clientOptions = {
        connectionRetries: 5,
    };
    if (proxyConfig) {
        clientOptions.proxy = proxyConfig;
        console.log('GramJS MTProto Proxy Configured.');
    }
    
    const client = new TelegramClient(stringSession, apiId, apiHash, clientOptions);

    await client.start({
        phoneNumber: async () => await input.text('Please enter your number: '),
        password: async () => await input.text('Please enter your password: '),
        phoneCode: async () => await input.text('Please enter the code you received: '),
        onError: (err) => console.log(err),
    });

    console.log('You should now be connected.');
    console.log('Save this string session to your config/env to avoid logging in again:');
    console.log(client.session.save());

    // Main Message Handler
    client.addEventHandler(async (event) => {
        const message = event.message;

        // Constraint 1: ONLY work in groups
        if (!event.isGroup) {
            return;
        }

        const textLower = message.text ? message.text.toLowerCase().trim() : '';
        const isGreeting = ['hi', 'hello', 'hey', 'halo', 'ayubowan', 'kohomada'].includes(textLower);

        // Constraint 2: Trigger if it's a specific Reply TO the bot OR if it's a generic greeting
        let isValidTrigger = false;

        if (message.isReply) {
            const repliedMsg = await message.getReplyMessage();
            if (repliedMsg) {
                // Check if the replied message was sent by the userbot
                if (repliedMsg.out) {
                     isValidTrigger = true;
                } else {
                     const me = await client.getMe();
                     if (repliedMsg.senderId && repliedMsg.senderId.valueOf() === me.id.valueOf()) {
                         isValidTrigger = true;
                     }
                }
            }
        } else if (isGreeting) {
            // Trigger on generic greetings sent to the group, even if not replied directly
            isValidTrigger = true;
        }

        if (!isValidTrigger) {
            return; // Ignore messages that aren't replies to us, unless it's a generic greeting
        }

        // Valid trigger!
        const sender = await message.getSender();
        const chat = await message.getChat();
        
        // Save interactions to SQLite
        const username = sender?.username || sender?.firstName || 'Unknown';
        const groupTitle = chat?.title || 'Unknown Group';
        
        recordInteraction(
            sender?.id ? sender.id.valueOf() : 0,
            username,
            chat?.id ? chat.id.valueOf() : 0,
            groupTitle
        );

        // Simulated Delay/Action Function
        const sleep = ms => new Promise(r => setTimeout(r, ms));

        // Constraint 3: If user replies with a sticker, we reply with a sticker
        if (message.sticker || message.document?.mimeType?.includes('image/webp') || message.document?.mimeType?.includes('application/x-tgsticker')) {
            console.log(`[Group] ${username} replied with a sticker! Choosing sticker to reply...`);
            
            // Set Choosing Sticker Action
            await client.invoke(new Api.messages.SetTyping({
                peer: chat.id,
                action: new Api.SendMessageChooseStickerAction()
            }));
            
            await sleep(2000); // Wait 2s to simulate finding a sticker
            
            if (stickerPacks.length > 0) {
                 try {
                     // Try to fetch a sticker from the configured packs
                     // This is a simplified logic. Properly, one would fetch the pack, get a doc, and send it.
                     // GramJS can send stickers if provided a valid input document or bot API file ID.
                     // For a userbot, we can send a random sticker from a saved pack.
                     
                     // Get all installed stickers (simplified hack: just send a thumbs up or get recent)
                     const recentStickers = await client.invoke(new Api.messages.GetRecentStickers({
                        attached: false
                     }));
                     
                     if (recentStickers && recentStickers.stickers.length > 0) {
                         const randomSticker = recentStickers.stickers[Math.floor(Math.random() * recentStickers.stickers.length)];
                         await client.sendMessage(chat.id, {
                             file: randomSticker,
                             replyTo: message.id 
                         });
                         return;
                     }
                 } catch (err) {
                     console.log('Error fetching/sending sticker:', err.message);
                 }
            } else {
                 console.log('No sticker packs configured or fetch failed. Sending text fallback.');
            }
        } 
        
        // Text NLP Logic
        if (message.text) {
             console.log(`[Group] ${username} said: "${message.text}"`);
             
             // Set Typing Action
             await client.invoke(new Api.messages.SetTyping({
                peer: chat.id,
                action: new Api.SendMessageTypingAction()
            }));
            
            const replyData = await getReply(message.text);
            const actualText = replyData.text; // get Reply now returns { text, isMatched }
            
            // Simulate typing delay based on string length (approx 100ms per char)
            const typingTime = Math.min(Math.max(actualText.length * 100, 1000), 5000); 
            await sleep(typingTime);
            
            await client.sendMessage(chat.id, {
                message: actualText,
                replyTo: message.id
            });
        }

    }, new NewMessage({}));
    
    console.log('Userbot listening for replies in groups...');

})();
