const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Apply global proxy to generic Node.js HTTP/HTTPS requests
if (process.env.PROXY_URL) {
    process.env.GLOBAL_AGENT_HTTP_PROXY = process.env.PROXY_URL;
    require('global-agent/bootstrap');
}

const { TelegramClient, Api } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { NewMessage } = require('telegram/events');
const input = require('input');
const { setupNlp, getReply, trainDynamicIntent } = require('./nlp.js');
const { db, recordInteraction, saveLearnedPair, syncLearnedKnowledge } = require('./db.js');
const { performBackup, restoreFromBackup } = require('./backup.js');
const http = require('http');
const net = require('net');
const url = require('url');

// --- Dummy HTTP Server for Hugging Face Healthcheck ---
const PROXY_PORT = process.env.PORT || 7860;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Telegram Userbot is running!');
});

server.listen(PROXY_PORT, '0.0.0.0', () => {
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

    // --- GitHub Knowledge Restoration ---
    try {
        const backupKnowledge = await restoreFromBackup();
        if (backupKnowledge) {
            console.log(`[Startup] Syncing ${backupKnowledge.length} items from GitHub to Local SQLite...`);
            await syncLearnedKnowledge(backupKnowledge);
        }
    } catch (err) {
        console.error('[Startup] Failed to restore from GitHub:', err.message);
    }
    // ------------------------------------

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

    console.log(client.session.save());

    const me = await client.getMe();
    const myId = me.id.valueOf().toString();
    console.log(`Bot ID cached: ${myId}`);

    // Main Message Handler
    client.addEventHandler(async (event) => {
        const message = event.message;

        // --- Owner Commands (DMs) ---
        if (!event.isGroup && message.text && message.text.toLowerCase() === '/backup') {
            const senderId = message.senderId?.valueOf()?.toString();
            const ownerId = process.env.OWNER_ID;

            if (senderId === ownerId) {
                console.log('[Owner] Received manual /backup command.');
                await client.sendMessage(message.chatId, { message: '🚀 Starting manual backup to GitHub...' });
                const result = await performBackup();
                await client.sendMessage(message.chatId, {
                    message: result.success ? '✅ Backup completed successfully!' : `❌ Backup failed: ${result.message}`
                });
                return;
            }
        }

        // Constraint 1: ONLY work in groups (including Megagroups which are Channels in GramJS)
        if (!event.isGroup && !event.isChannel) {
            return;
        }

        let chat;
        try {
            chat = await message.getChat();
        } catch (e) {
            console.log('[Event] Could not fetch chat details, skipping.');
            return;
        }

        console.log(`[Event] Received message in ${event.isChannel ? 'Megagroup/Channel' : 'Group'}: ${chat?.title || 'Unknown'}`);

        // Special check: If it's a channel but NOT a megagroup (e.g. broadcast), skip it
        if (event.isChannel && chat && chat.className !== 'Chat' && !chat.megagroup) {
            console.log(`[Event] Ignoring broadcast channel: ${chat?.title}`);
            return;
        }

        const textLower = message.text ? message.text.toLowerCase().trim() : '';
        const greetingList = ['hi', 'hello', 'hey', 'halo', 'ayubowan', 'kohomada', 'mchn', 'machan', 'oii', 'oi', 'ado', 'bro'];
        const isGreeting = greetingList.includes(textLower);

        // --- Self Learning Feedback Loop ---
        // If THIS message is a text reply to ANOTHER user's text message, we securely map the Utterance -> Response
        if (message.isReply && message.text) {
            try {
                const repliedMsg = await message.getReplyMessage();
                // Ensure both messages exist, both are text, and the replied message is from a real user (not a bot)
                if (repliedMsg && repliedMsg.text && !repliedMsg.out) {
                    const sender = await repliedMsg.getSender();
                    if (sender && !sender.bot) {
                        const utterance = repliedMsg.text.trim();
                        const response = message.text.trim();

                        // Ignore extremely long paragraphs or 1-word generic replies that might ruin training
                        if (utterance.length > 3 && utterance.length < 100 && response.length > 2 && response.length < 150) {
                            console.log(`[Self-Learning] Captured mapping -> Utterance: "${utterance}" | Response: "${response}"`);

                            // Save to SQLite & Train Live
                            const intentId = `learned.${Date.now()}`;
                            const savedId = await saveLearnedPair(intentId, utterance, response);
                            await trainDynamicIntent(intentId, utterance, response);
                        }
                    }
                }
            } catch (e) { /* Ignore fetch errors */ }
        }
        // -----------------------------------

        // Constraint 2: Trigger if it's a specific Reply TO the userbot OR if it's a generic greeting
        let isValidTrigger = false;

        if (message.isReply) {
            const repliedMsg = await message.getReplyMessage();
            if (repliedMsg) {
                const repliedSenderId = repliedMsg.senderId?.valueOf()?.toString();

                // Check if the replied message was sent by the userbot
                if (repliedMsg.out || repliedSenderId === myId) {
                    isValidTrigger = true;
                }
            }
        } else if (isGreeting) {
            // Trigger on generic greetings sent to the group, even if not replied directly
            isValidTrigger = true;
        }

        if (!isValidTrigger) {
            if (isGreeting) {
                console.log(`[Event] Detected greeting "${message.text}" but not a valid trigger (not a reply to me). Ignoring.`);
            }
            return; // Ignore messages that aren't replies to us, unless it's a generic greeting
        }

        // Valid trigger!
        const sender = await message.getSender();
        // chat is already defined and fetched above at line 111 (for Megagroup check)

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

    // --- Hourly Backup Interval ---
    setInterval(async () => {
        console.log('[Interval] Executing 60-minute automated backup...');
        await performBackup();
    }, 60 * 60 * 1000); // 60 minutes

})();
