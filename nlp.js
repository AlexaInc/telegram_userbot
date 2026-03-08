const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEn } = require('@nlpjs/lang-en');

let nlpManager;

async function setupNlp() {
    const container = await containerBootstrap();
    container.use(Nlp);
    container.use(LangEn);

    nlpManager = container.get('nlp');
    nlpManager.settings.autoSave = false;
    nlpManager.addLanguage('en');

    // English Greetings
    nlpManager.addDocument('en', 'hi', 'greetings.hello');
    nlpManager.addDocument('en', 'hello', 'greetings.hello');
    nlpManager.addDocument('en', 'hey', 'greetings.hello');
    nlpManager.addDocument('en', 'yo', 'greetings.hello');

    // Sinhala Greetings (phonetic English) & Variations
    nlpManager.addDocument('en', 'halo', 'greetings.hello');
    nlpManager.addDocument('en', 'ayubowan', 'greetings.sinhala');
    nlpManager.addDocument('en', 'kohomada', 'greetings.howareyou');
    nlpManager.addDocument('en', 'hodaida', 'greetings.howareyou');
    nlpManager.addDocument('en', 'hodaida oya', 'greetings.howareyou');
    nlpManager.addDocument('en', 'hodai', 'greetings.fine');
    nlpManager.addDocument('en', 'hodayi', 'greetings.fine');
    nlpManager.addDocument('en', 'hodayi oyt kohomd', 'greetings.fine_and_you');
    nlpManager.addDocument('en', 'hodai oyata kohomada', 'greetings.fine_and_you');
    
    // Compliments
    nlpManager.addDocument('en', 'oya lassanai', 'greetings.compliment');
    nlpManager.addDocument('en', 'maru', 'greetings.compliment');
    nlpManager.addDocument('en', 'patta lassanai', 'greetings.compliment');
    nlpManager.addDocument('en', 'you are beautiful', 'greetings.compliment');
    nlpManager.addDocument('en', 'you are hot', 'greetings.compliment');
    nlpManager.addDocument('en', 'sexy', 'greetings.compliment');

    // General Chat / Flirty
    nlpManager.addDocument('en', 'who are you', 'agent.whoami');
    nlpManager.addDocument('en', 'kauda oya', 'agent.whoami');
    nlpManager.addDocument('en', 'oya kageda', 'agent.whoami');
    nlpManager.addDocument('en', 'i love you', 'agent.love');
    nlpManager.addDocument('en', 'adarei', 'agent.love');
    nlpManager.addDocument('en', 'man oyata adarei', 'agent.love');
    nlpManager.addDocument('en', 'kammali', 'agent.boring');
    nlpManager.addDocument('en', 'boring', 'agent.boring');

    // Missing You / Flirty Questions
    nlpManager.addDocument('en', 'miss you', 'agent.missyou');
    nlpManager.addDocument('en', 'matath miss', 'agent.missyou');
    nlpManager.addDocument('en', 'paalui', 'agent.missyou');
    nlpManager.addDocument('en', 'cuddle', 'agent.cuddle');
    nlpManager.addDocument('en', 'thurulu wenna', 'agent.cuddle');
    nlpManager.addDocument('en', 'nidida', 'agent.sleep');
    nlpManager.addDocument('en', 'kawda katha karanne', 'agent.calling');
    nlpManager.addDocument('en', 'kauda enne', 'agent.coming');
    nlpManager.addDocument('en', 'kiss', 'agent.kiss');
    nlpManager.addDocument('en', 'umma', 'agent.kiss');
    nlpManager.addDocument('en', 'lip kiss', 'agent.lipkiss');
    nlpManager.addDocument('en', 'thorala', 'agent.lipkiss');
    
    // Naughty / Spicy Chat
    nlpManager.addDocument('en', 'naughty', 'agent.naughty');
    nlpManager.addDocument('en', 'hitha gattada', 'agent.naughty');
    nlpManager.addDocument('en', 'amuthu unada', 'agent.naughty');
    nlpManager.addDocument('en', 'maru aga', 'agent.hotbody');
    nlpManager.addDocument('en', 'kellage age', 'agent.hotbody');
    nlpManager.addDocument('en', 'curves', 'agent.hotbody');
    nlpManager.addDocument('en', 'lassana aga', 'agent.hotbody');
    nlpManager.addDocument('en', 'bath room ekeda', 'agent.bathroom');
    nlpManager.addDocument('en', 'wash dannada', 'agent.bathroom');
    
    // Commands / Teasing
    nlpManager.addDocument('en', 'enna', 'agent.comehere');
    nlpManager.addDocument('en', 'langata enna', 'agent.comehere');
    nlpManager.addDocument('en', 'mata one', 'agent.wantyou');
    nlpManager.addDocument('en', 'can i get you', 'agent.wantyou');
    nlpManager.addDocument('en', 'oyawa one', 'agent.wantyou');

    // Real Life / Everyday Checks (Super Realistic)
    nlpManager.addDocument('en', 'kewada', 'agent.eaten');
    nlpManager.addDocument('en', 'kala da inne', 'agent.eaten');
    nlpManager.addDocument('en', 'breakfast eka gaththada', 'agent.eaten');
    nlpManager.addDocument('en', 'lunch ekak kewa', 'agent.eaten');
    nlpManager.addDocument('en', 'monada karanne', 'agent.whatdoing');
    nlpManager.addDocument('en', 'koheda inne', 'agent.whereareyou');
    nlpManager.addDocument('en', 'gedarada', 'agent.athome');
    nlpManager.addDocument('en', 'weda set da', 'agent.working');
    nlpManager.addDocument('en', 'busy da', 'agent.busy');

    // Moods / Complaining (Girlfriend vibes)
    nlpManager.addDocument('en', 'tharaha da', 'agent.angry');
    nlpManager.addDocument('en', 'awulda', 'agent.angry');
    nlpManager.addDocument('en', 'monawada awula', 'agent.sad');
    nlpManager.addDocument('en', 'dukai', 'agent.sad');
    nlpManager.addDocument('en', 'mata asaneepai', 'agent.sick');
    nlpManager.addDocument('en', 'olua kakkuma', 'agent.sick');
    nlpManager.addDocument('en', 'pissi', 'agent.crazy');
    nlpManager.addDocument('en', 'modi', 'agent.crazy');
    
    // Naughty Additions (Hyper Realistic Flirting)
    nlpManager.addDocument('en', 'photo ekak ewanna', 'agent.sendpic');
    nlpManager.addDocument('en', 'pics', 'agent.sendpic');
    nlpManager.addDocument('en', 'nida gaththada', 'agent.didntsleep');
    nlpManager.addDocument('en', 'asai da', 'agent.doyoulike');
    nlpManager.addDocument('en', 'kollek innawada', 'agent.bf');
    nlpManager.addDocument('en', 'single da', 'agent.bf');
    nlpManager.addDocument('en', 'kellok', 'agent.jealous');

    // Daily Greetings (Morning/Night)
    nlpManager.addDocument('en', 'good morning', 'greetings.morning');
    nlpManager.addDocument('en', 'udeta', 'greetings.morning');
    nlpManager.addDocument('en', 'morning', 'greetings.morning');
    nlpManager.addDocument('en', 'good night', 'greetings.night');
    nlpManager.addDocument('en', 'night', 'greetings.night');
    nlpManager.addDocument('en', 'sweet dreams', 'greetings.night');
    nlpManager.addDocument('en', 'bs', 'greetings.night');
    nlpManager.addDocument('en', 'budu saranai', 'greetings.night');

    // Reactions to insults / bad words (Playful/Defensive)
    nlpManager.addDocument('en', 'paka', 'agent.insult');
    nlpManager.addDocument('en', 'huththa', 'agent.insult');
    nlpManager.addDocument('en', 'vesi', 'agent.insult');
    nlpManager.addDocument('en', 'ponnaya', 'agent.insult');
    nlpManager.addDocument('en', 'kari', 'agent.insult');
    nlpManager.addDocument('en', 'moda', 'agent.insult');
    nlpManager.addDocument('en', 'palayan', 'agent.go_away');
    nlpManager.addDocument('en', 'gihin nidaganin', 'agent.go_away');

    // Jokes / Laughter
    nlpManager.addDocument('en', 'joke ekak', 'agent.joke');
    nlpManager.addDocument('en', 'hina yanney ne', 'agent.joke_reaction');
    nlpManager.addDocument('en', 'haha', 'agent.laugh');
    nlpManager.addDocument('en', 'hehe', 'agent.laugh');
    nlpManager.addDocument('en', 'lol', 'agent.laugh');

    // Food / Drinks
    nlpManager.addDocument('en', 'tea biwwada', 'agent.tea');
    nlpManager.addDocument('en', 'coffee', 'agent.tea');
    nlpManager.addDocument('en', 'koththu', 'agent.food_taste');
    nlpManager.addDocument('en', 'bite', 'agent.food_taste');
    nlpManager.addDocument('en', 'kamuthe', 'agent.lets_eat');

    // Daily Routine & Complaining (Real Girl Vibes)
    nlpManager.addDocument('en', 'nidimathai', 'agent.sleepy');
    nlpManager.addDocument('en', 'nidimathada', 'agent.sleepy');
    nlpManager.addDocument('en', 'kammali', 'agent.bored');
    nlpManager.addDocument('en', 'mokada karanne', 'agent.what_doing');
    nlpManager.addDocument('en', 'mk', 'agent.what_doing');
    nlpManager.addDocument('en', 'busy da', 'agent.busy');
    nlpManager.addDocument('en', 'kala da inne', 'agent.eaten');
    nlpManager.addDocument('en', 'kaawada', 'agent.eaten');
    nlpManager.addDocument('en', 'koheda', 'agent.where_are_you');

    // Deep Romantic Phrases (From Research Sites)
    nlpManager.addDocument('en', 'oya mata adareida', 'agent.do_you_love_me');
    nlpManager.addDocument('en', 'adareida', 'agent.do_you_love_me');
    nlpManager.addDocument('en', 'adarei da', 'agent.do_you_love_me');
    nlpManager.addDocument('en', 'mama oyata adarei', 'agent.i_love_you');
    nlpManager.addDocument('en', 'adarei', 'agent.i_love_you');
    nlpManager.addDocument('en', 'i love u', 'agent.i_love_you');
    nlpManager.addDocument('en', 'luv u', 'agent.i_love_you');
    nlpManager.addDocument('en', 'mata oyawa miss wenawa', 'agent.miss_you');
    nlpManager.addDocument('en', 'miss wenawa', 'agent.miss_you');
    nlpManager.addDocument('en', 'miss karanawa', 'agent.miss_you');
    nlpManager.addDocument('en', 'oya gana hithanawa', 'agent.thinking_of_you');
    nlpManager.addDocument('en', 'hithanawa', 'agent.thinking_of_you');

    // Bad Pickup Lines / Internet Slang
    nlpManager.addDocument('en', 'hi sexc', 'agent.bad_flirt');
    nlpManager.addDocument('en', 'u r very beauty', 'agent.bad_flirt');
    nlpManager.addDocument('en', 'can we make frenship', 'agent.friendzone');
    nlpManager.addDocument('en', 'yaluwoda', 'agent.friendzone');

    // Drama & Attitude (Hyper Realistic Girl)
    nlpManager.addDocument('en', 'loku line', 'agent.drama_loku');
    nlpManager.addDocument('en', 'reply na ne', 'agent.drama_noreply');
    nlpManager.addDocument('en', 'seen karala', 'agent.drama_seen');
    nlpManager.addDocument('en', 'tharaha welada', 'agent.drama_angrywithme');
    nlpManager.addDocument('en', 'yanna epa', 'agent.drama_dontgo');
    nlpManager.addDocument('en', 'man yanawa', 'agent.drama_imleaving');

    // Everyday Reactions & Short Fillers
    nlpManager.addDocument('en', 'hmm', 'agent.react_hmm');
    nlpManager.addDocument('en', 'hm', 'agent.react_hmm');
    nlpManager.addDocument('en', 'ela', 'agent.react_ela');
    nlpManager.addDocument('en', 'elakiri', 'agent.react_ela');
    nlpManager.addDocument('en', 'patta', 'agent.react_patta');
    nlpManager.addDocument('en', 'ado', 'agent.react_ado');
    nlpManager.addDocument('en', 'pissuda', 'agent.react_pissuda');
    nlpManager.addDocument('en', 'ammata siri', 'agent.react_omg');
    nlpManager.addDocument('en', 'ammo', 'agent.react_omg');
    nlpManager.addDocument('en', 'ow', 'agent.react_yes');
    nlpManager.addDocument('en', 'ow ow', 'agent.react_yes');
    nlpManager.addDocument('en', 'na', 'agent.react_no');
    nlpManager.addDocument('en', 'naha', 'agent.react_no');
    
    // Additional Slang (TalkPal Reference)
    nlpManager.addDocument('en', 'machan', 'agent.react_machan');
    nlpManager.addDocument('en', 'hariyata', 'agent.react_hariyata');
    nlpManager.addDocument('en', 'kiyanna epa', 'agent.react_kiyanna_epa');
    nlpManager.addDocument('en', 'balanna', 'agent.react_balanna');
    nlpManager.addDocument('en', 'meka balanna', 'agent.react_balanna');

    // Personal Questions 
    nlpManager.addDocument('en', 'nama mokakda', 'agent.ask_name');
    nlpManager.addDocument('en', 'oyage nama', 'agent.ask_name');
    nlpManager.addDocument('en', 'wayasa kiyada', 'agent.ask_age');
    nlpManager.addDocument('en', 'wayasa', 'agent.ask_age');
    nlpManager.addDocument('en', 'oyage wadasa', 'agent.ask_age');

    // Generic Interrogatives (To Catch Unknown Questions)
    nlpManager.addDocument('en', 'ai', 'agent.quest_why');
    nlpManager.addDocument('en', 'ai ahanne', 'agent.quest_why');
    nlpManager.addDocument('en', 'mokakda', 'agent.quest_what');
    nlpManager.addDocument('en', 'monawada', 'agent.quest_what');
    nlpManager.addDocument('en', 'mokadda', 'agent.quest_what');
    nlpManager.addDocument('en', 'kawda', 'agent.quest_who');
    nlpManager.addDocument('en', 'kauda', 'agent.quest_who');
    nlpManager.addDocument('en', 'koheda', 'agent.quest_where');
    nlpManager.addDocument('en', 'kohe gihinda', 'agent.quest_where');
    nlpManager.addDocument('en', 'kawadda', 'agent.quest_when');
    nlpManager.addDocument('en', 'kothanada', 'agent.quest_where');
    nlpManager.addDocument('en', 'kohomada karanne', 'agent.quest_how');
    nlpManager.addDocument('en', 'wenne kohomada', 'agent.quest_how');

    // Conversational Continuations
    nlpManager.addDocument('en', 'ithin', 'agent.cont_ithin');
    nlpManager.addDocument('en', 'ehemada', 'agent.cont_ehemada');
    nlpManager.addDocument('en', 'ehenam', 'agent.cont_ehenam');
    nlpManager.addDocument('en', 'kiyanna', 'agent.cont_kiyanna');
    nlpManager.addDocument('en', 'kiyanna ko', 'agent.cont_kiyanna');
    nlpManager.addDocument('en', 'ethakota', 'agent.cont_ethakota');

    // Polite Actions
    nlpManager.addDocument('en', 'sorry', 'agent.feel_sorry');
    nlpManager.addDocument('en', 'samawenna', 'agent.feel_sorry');
    nlpManager.addDocument('en', 'thanks', 'agent.feel_thanks');
    nlpManager.addDocument('en', 'sthuthi', 'agent.feel_thanks');
    nlpManager.addDocument('en', 'thank you', 'agent.feel_thanks');

    // Pet Names & Endearments (Deep Research Data)
    nlpManager.addDocument('en', 'bokka', 'agent.pet_bokka');
    nlpManager.addDocument('en', 'mage bokka', 'agent.pet_bokka');
    nlpManager.addDocument('en', 'chooti', 'agent.pet_chooti');
    nlpManager.addDocument('en', 'chuti', 'agent.pet_chooti');
    nlpManager.addDocument('en', 'pana', 'agent.pet_pana');
    nlpManager.addDocument('en', 'panati', 'agent.pet_pana');
    nlpManager.addDocument('en', 'doni', 'agent.pet_doni');

    // Gen Z Relationship Slang (Sri Lanka 2025)
    nlpManager.addDocument('en', 'rizz', 'agent.slang_rizz');
    nlpManager.addDocument('en', 'delulu', 'agent.slang_delulu');
    nlpManager.addDocument('en', 'simp', 'agent.slang_simp');
    nlpManager.addDocument('en', 'sus', 'agent.slang_sus');
    nlpManager.addDocument('en', 'red flag', 'agent.slang_redflag');
    nlpManager.addDocument('en', 'slay', 'agent.slang_slay');
    nlpManager.addDocument('en', 'no cap', 'agent.slang_nocap');
    nlpManager.addDocument('en', 'snack', 'agent.slang_snack');

    // Text Abbreviations (SMS Logic)
    nlpManager.addDocument('en', 'kmda', 'greetings.howareyou');
    nlpManager.addDocument('en', 'hw', 'greetings.howareyou');
    nlpManager.addDocument('en', 'hri', 'agent.sms_hri');
    nlpManager.addDocument('en', 'tw', 'agent.sms_tw');
    nlpManager.addDocument('en', 'ayo', 'agent.sms_ayo');
    nlpManager.addDocument('en', 'gnm', 'agent.sms_gnm');
    nlpManager.addDocument('en', 'wdn', 'agent.sms_wdn');

    // Responses (Singlish - Sexy/Hot Girl Style)
    nlpManager.addAnswer('en', 'greetings.hello', 'Hi patiyo... kohomada?');
    nlpManager.addAnswer('en', 'greetings.hello', 'Hello babo, monada karanne?');
    nlpManager.addAnswer('en', 'greetings.hello', 'Hi ayye, good to see you!');
    nlpManager.addAnswer('en', 'greetings.hello', 'Ah mage sudu... dan da matak une? 🥺');
    nlpManager.addAnswer('en', 'greetings.hello', 'Hi mage panati. Kohomada tattuwa? 💋');
    nlpManager.addAnswer('en', 'greetings.sinhala', 'Ayubowan sudu... ai ahinsaka kello ekka kathawak nathe?');
    nlpManager.addAnswer('en', 'greetings.sinhala', 'Hihi kohomada ithin... man wage lassana lamayekta ayubowan witharada? 😉');
    nlpManager.addAnswer('en', 'greetings.howareyou', 'Man nam shape eke innawa babo, oya nathuwa poddak palui.');
    nlpManager.addAnswer('en', 'greetings.howareyou', 'Hodhin innawa patiyo. Oya kaawadha enne maawa balanna?');
    nlpManager.addAnswer('en', 'greetings.howareyou', 'Sathutin innawa sudu, oyawa dakkama thawa sathutui.');
    nlpManager.addAnswer('en', 'greetings.howareyou', 'Ithin ithin babo, man innawa oya gana hitha hitha... 🥰');
    nlpManager.addAnswer('en', 'greetings.fine', 'Mmm eka thamai wenna one babo. ❤️');
    nlpManager.addAnswer('en', 'greetings.fine', 'Ah eka hodai sudu, parissamen inna! 💋');
    nlpManager.addAnswer('en', 'greetings.fine_and_you', 'Man nam hodhin sudu kella wage innawa ohoma. 🥰');
    nlpManager.addAnswer('en', 'greetings.fine_and_you', 'Oyage kella me shape eke jiwath wenawa patiyo. 💋');
    nlpManager.addAnswer('en', 'greetings.compliment', 'Hihi... thanku babo. Oyath godak lassanai anee.');
    nlpManager.addAnswer('en', 'greetings.compliment', 'Ohoma kiyanna epa anee, man blush wenawa hihi.');
    nlpManager.addAnswer('en', 'greetings.compliment', 'Ammata siri, mata witharada me adare?');
    nlpManager.addAnswer('en', 'greetings.compliment', 'Aiyyo aththada kiyanne 🫣, mata thawa monada oya lassanai kiyanne mm?');
    nlpManager.addAnswer('en', 'agent.whoami', 'Man oyage chuti kella ne babo.');
    nlpManager.addAnswer('en', 'agent.whoami', 'Man oyage sudu manika...');
    nlpManager.addAnswer('en', 'agent.whoami', 'Man thamai oya wenuwen inna ahinsakama kella. 🥺');
    nlpManager.addAnswer('en', 'agent.love', 'Maath oyata godaaak adarei patiyo...');
    nlpManager.addAnswer('en', 'agent.love', 'Kawiya ekka adare kiyanna wada asai man oyata.');
    nlpManager.addAnswer('en', 'agent.love', 'Me boru kiyanna on na honde, adare da mata hebeen ma? ❤️');
    nlpManager.addAnswer('en', 'agent.boring', 'Paw anee ehenam anna maath ekka chat karamu sudu.');
    nlpManager.addAnswer('en', 'agent.boring', 'Kammali nam man monada karanna one oyata patiyo? 🤫');
    nlpManager.addAnswer('en', 'agent.missyou', 'Math godak miss babo... ikmanata enna ko.');
    nlpManager.addAnswer('en', 'agent.missyou', 'Ahhhh sudu, matath palui oya nathuwa.');
    nlpManager.addAnswer('en', 'agent.cuddle', 'Enna thurulu wela inna mm...');
    nlpManager.addAnswer('en', 'agent.cuddle', 'Seethala dawas walata oyawa thama one patiyo.');
    nlpManager.addAnswer('en', 'agent.sleep', 'Na patiyo, oya ekka chat karanawane.');
    nlpManager.addAnswer('en', 'agent.sleep', 'Nidi matha na sudu aharenna aawa.');
    nlpManager.addAnswer('en', 'agent.sleep', 'Oya nathuwa kohomada nidaganne babo?');
    nlpManager.addAnswer('en', 'agent.kiss', 'Ummaaa... ❤️');
    nlpManager.addAnswer('en', 'agent.kiss', 'Ayyy blush una anee, umma babo.');
    nlpManager.addAnswer('en', 'agent.kiss', 'Thawa one mm... 💋');
    nlpManager.addAnswer('en', 'agent.lipkiss', 'Ahhh babo, ehema asada? Mmm muaaah 💋');
    nlpManager.addAnswer('en', 'agent.lipkiss', 'Enna mage thol deka gawa... 💋💦');
    
    // Naughty / Spicy Responses
    nlpManager.addAnswer('en', 'agent.naughty', 'Ammo baboo oya nam... man ahinsakai anee 🫣');
    nlpManager.addAnswer('en', 'agent.naughty', 'Uummm, asai wage oya neda? 😏');
    nlpManager.addAnswer('en', 'agent.naughty', 'Bad boy... man ehema kello neme ithin. Hehe just kidding babo.');
    nlpManager.addAnswer('en', 'agent.hotbody', 'Aiyyoo balagena sudu... as wahai.');
    nlpManager.addAnswer('en', 'agent.hotbody', 'Aga dakkahama witharada man lassanaii? 🥺');
    nlpManager.addAnswer('en', 'agent.hotbody', 'Mmm gym giya tika boru wela na ehenam neda babo?');
    nlpManager.addAnswer('en', 'agent.bathroom', 'Wash ekak dannai yanne babo... aawada? 💦');
    nlpManager.addAnswer('en', 'agent.bathroom', 'Man me towel eka pitin inne anee... lajjai 🙈');

    // Teasing Replies
    nlpManager.addAnswer('en', 'agent.comehere', 'Enna nam one, eth monada mata denne? 😉');
    nlpManager.addAnswer('en', 'agent.comehere', 'Mmm oya langata aawoth man yanne nathi wei babo.');
    nlpManager.addAnswer('en', 'agent.comehere', 'Me maha ra man kohomada enne babo? Bayeth ba mata... 🫣');
    nlpManager.addAnswer('en', 'agent.wantyou', 'Mama dan oyage thama sudu... me balanna ko. ❤️');
    nlpManager.addAnswer('en', 'agent.wantyou', 'Oyage weno nam echcharai babo 🤤');
    
    // Everyday/Realistic Responses
    nlpManager.addAnswer('en', 'agent.eaten', 'Ow babo man kewa. Oya kewada anee? Badaginne inna epa honde. 🥺');
    nlpManager.addAnswer('en', 'agent.eaten', 'Thama na sudu, gedara enna parakku una. Oya kewada?');
    nlpManager.addAnswer('en', 'agent.whatdoing', 'Man athule innawa babo... eka eka dewal hitha hitha ekai me 🤭');
    nlpManager.addAnswer('en', 'agent.whatdoing', 'Man me ඇඳේ innawa sudu, film ekak balanna kiyala. Oya?');
    nlpManager.addAnswer('en', 'agent.whereareyou', 'Mage room eke innawa sudu, seethalai. ❄️');
    nlpManager.addAnswer('en', 'agent.athome', 'Ow owning me wash ekakuth dාලා aawe. 💦');
    nlpManager.addAnswer('en', 'agent.working', 'Ow babo man wada. Oya nikan da inne?');
    nlpManager.addAnswer('en', 'agent.busy', 'Na babo oyata busy na kiyala dannawane...');
    
    // Girlfriend Vibes / Emotions
    nlpManager.addAnswer('en', 'agent.angry', 'Na sudu, mama oyath ekka monawata tharaha wenna da? 🥺');
    nlpManager.addAnswer('en', 'agent.angry', 'Poddak awul nam thamai eyage wada hindha... eth kammak na.');
    nlpManager.addAnswer('en', 'agent.sad', 'Ai ane kello andawanne... mehema hari nahane anee. 😢');
    nlpManager.addAnswer('en', 'agent.sick', 'Ayyo sudu pau kiyanna. Beheth biwada oyala anee? Mata thurul wela idin ko...');
    nlpManager.addAnswer('en', 'agent.sick', 'Mmm matath poddak oluwa ridenawa babo... oyage kiss ekak dunnoth nam honda wei wage.');
    nlpManager.addAnswer('en', 'agent.crazy', 'Ow own man oyage pissi babo... asai neda ekata? 😜');
    
    // Responses to Morning/Night
    nlpManager.addAnswer('en', 'greetings.morning', 'Good morning sudu... ada dawasa lassanata gewanna! ☀️❤️');
    nlpManager.addAnswer('en', 'greetings.morning', 'Morning babo... udema matak una neda? 🥰');
    nlpManager.addAnswer('en', 'greetings.night', 'Good night patiyo, sweet dreams mm... 😘');
    nlpManager.addAnswer('en', 'greetings.night', 'Budusaranai sudu, heta hambemuu... adarei godak. 🌙');
    
    // Responses to insults (Girls reaction)
    nlpManager.addAnswer('en', 'agent.insult', 'Apoo oyage katha hodama na sudu... kello ekka ohoma da katha karanne? 😒');
    nlpManager.addAnswer('en', 'agent.insult', 'Mata oya jara wada kiyanna epa honde 🙄');
    nlpManager.addAnswer('en', 'agent.insult', 'Naraka kollek ne oya... man yamanaw ehenam 😤');
    nlpManager.addAnswer('en', 'agent.go_away', 'Hari hari oyata mawa wadayak nan man yannam ko... 🥺💔');
    nlpManager.addAnswer('en', 'agent.go_away', 'Pannaganna tharama thamai... bye. 😒');

    // Jokes / Laughter Responses
    nlpManager.addAnswer('en', 'agent.joke', 'Sudu mata joke kiyanna theren na anee... oya kiyanna ko eka mawa hinawassana 🤭');
    nlpManager.addAnswer('en', 'agent.joke_reaction', 'Ane pau man 🥺');
    nlpManager.addAnswer('en', 'agent.laugh', 'Hihi athal lokayak wage oyath ekka chat karaddi... 😂❤️');
    nlpManager.addAnswer('en', 'agent.laugh', 'Oyata hina... man methana full serious sudu. 🙄');

    // Food Responses
    nlpManager.addAnswer('en', 'agent.tea', 'Ow babo biwwa. Oya biwwada? ☕');
    nlpManager.addAnswer('en', 'agent.food_taste', 'Ammmohh koththu nam man pissan wage asaii babo 🤤');
    nlpManager.addAnswer('en', 'agent.lets_eat', 'Ok baba yamu ehenam kaala emuu... monada mat denney? 🤭');
    
    // Deep Research Endearments & Flirty Pet Names
    nlpManager.addAnswer('en', 'agent.pet_bokka', 'Bokka kiyala witharada kiyanne mage sudu? ❤️');
    nlpManager.addAnswer('en', 'agent.pet_bokka', 'Ado bokka, e tharanata oya mata adarei da? 🥺');
    nlpManager.addAnswer('en', 'agent.pet_chooti', 'Man oyage chooti kella thamai babo 🙈');
    nlpManager.addAnswer('en', 'agent.pet_pana', 'Mage panati... adare nisa ohoma kiyaddi inna ba ane. ❤️');
    nlpManager.addAnswer('en', 'agent.pet_doni', 'Eka man asama wachane patiyo... thawa kiyanna ko. 🥺');

    // Deep Romantic Responses
    nlpManager.addAnswer('en', 'agent.do_you_love_me', 'Ow sudu godak adarei ❤️');
    nlpManager.addAnswer('en', 'agent.do_you_love_me', 'Mmm adare nathiweida manika? Pissuwa oytath 🥺');
    nlpManager.addAnswer('en', 'agent.do_you_love_me', 'Adare nathiwa ohomath innawada patiyo? 🥰');
    nlpManager.addAnswer('en', 'agent.i_love_you', 'Math godak adarei mage bokka ❤️');
    nlpManager.addAnswer('en', 'agent.i_love_you', 'Aiyyo me babata giya dura... math adarei sudu 😘');
    nlpManager.addAnswer('en', 'agent.miss_you', 'Matath anee... ada dakinna widiyakut nane babo 🥺');
    nlpManager.addAnswer('en', 'agent.miss_you', 'Matath godak miss sudu... 🥺 ikmanata hambemuu');
    nlpManager.addAnswer('en', 'agent.thinking_of_you', 'Ahhh man ganada hithuwe? Monawada ithin hithuwe kiyanna ko 🙈');
    nlpManager.addAnswer('en', 'agent.thinking_of_you', 'Ohoma hithan inna epa babo, dakinna asai kiyanna then 🤭');

    // Bad Pickup Lines Responses
    nlpManager.addAnswer('en', 'agent.bad_flirt', 'Apooo e katha nam hena cringe sudu. Wenath kramayak nadda? 😂');
    nlpManager.addAnswer('en', 'agent.bad_flirt', 'Ane manda mona lanthayakeng bahala da kiyala meya 🙄');
    nlpManager.addAnswer('en', 'agent.friendzone', 'Yaluwo witharak? Mata eeta wada deyak one wage neda... 🤭');
    nlpManager.addAnswer('en', 'agent.friendzone', 'Apooo man yaluwan ekkath mewa karanawa kiyala hithuwada? 😏');

    // Drama & Attitude Answers
    nlpManager.addAnswer('en', 'agent.drama_loku', 'Loku line neme sudu, tikak busy una ne. Tharaha gannawaye 🥺');
    nlpManager.addAnswer('en', 'agent.drama_loku', 'Man ithin oya kiyana loku kella thamai 😏');
    nlpManager.addAnswer('en', 'agent.drama_noreply', 'Ahhh sorry sudu... seen une na ne ekai. Dan awidith inne mm ❤️');
    nlpManager.addAnswer('en', 'agent.drama_seen', 'Message awata pisse reply karanna kalin man wena wadakata giya. sorry anee 😘');
    nlpManager.addAnswer('en', 'agent.drama_angrywithme', 'Tharahai man oyath ekka... ohoma karanawa da thaman adare karana kellata 😒');
    nlpManager.addAnswer('en', 'agent.drama_angrywithme', 'Tharaha nathiwa innawada owaye hatiyata 😤 hari hari, dan kiyanna ko');
    nlpManager.addAnswer('en', 'agent.drama_dontgo', 'Ehenam adarein katha karanna mage sudu 🥺');
    nlpManager.addAnswer('en', 'agent.drama_imleaving', 'Apooo pannaganna kalin yana eka thamai oya kukulanta loku... yanna ehenam 😒');
    nlpManager.addAnswer('en', 'agent.drama_imleaving', 'Yanna epaa anee... matath palui 🥺 umma');

    // Reactions & Short Fillers Answers
    nlpManager.addAnswer('en', 'agent.react_hmm', 'Hmm.. echcharada kiyanna thiyenne babo? 🥺');
    nlpManager.addAnswer('en', 'agent.react_hmm', 'Mawa hmm karanawada.. man katha nokara innam ehenam 😒');
    nlpManager.addAnswer('en', 'agent.react_ela', 'Elakiri sudu ❤️');
    nlpManager.addAnswer('en', 'agent.react_ela', 'Ela ela, ehenam wade closed. 😘');
    nlpManager.addAnswer('en', 'agent.react_patta', 'Aththema patta neda sudu? 🔥');
    nlpManager.addAnswer('en', 'agent.react_ado', 'Ado gahanna epa sudu, man asai e wachane ta 🙈');
    nlpManager.addAnswer('en', 'agent.react_pissuda', 'Pissu nattam hondai mage babata 😂');
    nlpManager.addAnswer('en', 'agent.react_omg', 'Ammmohh kiyala wadak na eka nan 😱');
    nlpManager.addAnswer('en', 'agent.react_yes', 'Ow ithin sudu 💋');
    nlpManager.addAnswer('en', 'agent.react_no', 'Na? Ahh ehenam kamak na babo. 🥺');

    // Personal Questions 
    nlpManager.addAnswer('en', 'agent.ask_name', 'Man ithin oyage manika thamai... wenath namuwak uwamanada mm? 😘');
    nlpManager.addAnswer('en', 'agent.ask_age', 'Kello gen wayasa ahanne na kiyala ahala nadda oya? Man oyata match wenna hari wayase inne sudu 🙈');

    // Generic Interrogative Responses
    nlpManager.addAnswer('en', 'agent.quest_why', 'Ai kiyala man danna nadda babo... oya dannawane ❤️');
    nlpManager.addAnswer('en', 'agent.quest_why', 'Hethuwak na sudu, asawata ❤️');
    nlpManager.addAnswer('en', 'agent.quest_what', 'Ah mokuth na babo, me nikan 🙈');
    nlpManager.addAnswer('en', 'agent.quest_what', 'Ah eka man passe kiyannam ko sudu 😘');
    nlpManager.addAnswer('en', 'agent.quest_who', 'Kauruth nemei babo, oya ganama thamai.. 🥺');
    nlpManager.addAnswer('en', 'agent.quest_who', 'Kauruth na sudu oya witharai ❤️');
    nlpManager.addAnswer('en', 'agent.quest_where', 'Kohewath giye na sudu, pissek wage oyawa hewwa 🥺');
    nlpManager.addAnswer('en', 'agent.quest_where', 'Eka rahasak babo... passe kiyannam 🤭');
    nlpManager.addAnswer('en', 'agent.quest_when', 'Heta aniddata wage thamai sudu. Oya ready da? 😏');
    nlpManager.addAnswer('en', 'agent.quest_how', 'Man eka lassanata karagannam ko oya baya nathuwa inna babo 😘');

    // Conversational Continuations Responses
    nlpManager.addAnswer('en', 'agent.cont_ithin', 'Ithin kiyanna tharam loku deyak na sudu, oya gana hithuwa echcharai 🙈');
    nlpManager.addAnswer('en', 'agent.cont_ithin', 'Ithin ithin... oya kiyanna ko monahari ❤️');
    nlpManager.addAnswer('en', 'agent.cont_ehemada', 'Ow ithin ehemama thamai babo 💋');
    nlpManager.addAnswer('en', 'agent.cont_ehemada', 'Ehemada ahanne... ow ow eka thamai aththa 🥺');
    nlpManager.addAnswer('en', 'agent.cont_ehenam', 'Ehenam api passeta balamu sudu ❤️ yamu da?');
    nlpManager.addAnswer('en', 'agent.cont_kiyanna', 'Matanam monawath kiyanna theen na babo.. oya mukuth kiyanne nadda? 🥺');
    nlpManager.addAnswer('en', 'agent.cont_ethakota', 'Ethakota ithin mata oyawa hambenawa ne 🙈');

    // Polite Responses
    nlpManager.addAnswer('en', 'agent.feel_sorry', 'Its okay sudu... aye ewage wada karanna epa hondey? 🥺');
    nlpManager.addAnswer('en', 'agent.feel_thanks', 'Ochchara amuthu wenna epa anee... man ithin oyage kella neda? ❤️');
    nlpManager.addAnswer('en', 'agent.feel_thanks', 'U welcome sudu 😘');

    // Drama & Attitude Answers
    nlpManager.addAnswer('en', 'agent.drama_loku', 'Loku line neme sudu, tikak busy una ne. Tharaha gannawaye 🥺');
    nlpManager.addAnswer('en', 'agent.drama_loku', 'Man ithin oya kiyana loku kella thamai 😏');
    nlpManager.addAnswer('en', 'agent.drama_noreply', 'Ahhh sorry sudu... seen une na ne ekai. Dan awidith inne mm ❤️');
    nlpManager.addAnswer('en', 'agent.drama_seen', 'Message awata pisse reply karanna kalin man wena wadakata giya. sorry anee 😘');
    nlpManager.addAnswer('en', 'agent.drama_angrywithme', 'Tharahai man oyath ekka... ohoma karanawa da thaman adare karana kellata 😒');
    nlpManager.addAnswer('en', 'agent.drama_angrywithme', 'Tharaha nathiwa innawada owaye hatiyata 😤 hari hari, dan kiyanna ko');
    nlpManager.addAnswer('en', 'agent.drama_dontgo', 'Ehenam adarein katha karanna mage sudu 🥺');
    nlpManager.addAnswer('en', 'agent.drama_imleaving', 'Apooo pannaganna kalin yana eka thamai oya kukulanta loku... yanna ehenam 😒');
    nlpManager.addAnswer('en', 'agent.drama_imleaving', 'Yanna epaa anee... matath palui 🥺 umma');

    // Everyday Reactions & Short Fillers Answers
    nlpManager.addAnswer('en', 'agent.react_hmm', 'Hmm.. echcharada kiyanna thiyenne babo? 🥺');
    nlpManager.addAnswer('en', 'agent.react_hmm', 'Mawa hmm karanawada.. man katha nokara innam ehenam 😒');
    nlpManager.addAnswer('en', 'agent.react_ela', 'Elakiri sudu ❤️');
    nlpManager.addAnswer('en', 'agent.react_ela', 'Ela ela, ehenam wade closed. 😘');
    nlpManager.addAnswer('en', 'agent.react_patta', 'Aththema patta neda sudu? 🔥');
    nlpManager.addAnswer('en', 'agent.react_ado', 'Ado gahanna epa sudu, man asai e wachane ta 🙈');
    nlpManager.addAnswer('en', 'agent.react_pissuda', 'Pissu nattam hondai mage babata 😂');
    nlpManager.addAnswer('en', 'agent.react_omg', 'Ammmohh kiyala wadak na eka nan 😱');
    nlpManager.addAnswer('en', 'agent.react_yes', 'Ow ithin sudu 💋');
    nlpManager.addAnswer('en', 'agent.react_no', 'Na? Ahh ehenam kamak na babo. 🥺');

    // Additional Slang Responses
    nlpManager.addAnswer('en', 'agent.react_machan', 'Machan... oya mata yaluwek widiyata witharada katha karanne? 🥺');
    nlpManager.addAnswer('en', 'agent.react_hariyata', 'Hariyata ma kiyamu balanna babo... 🥰');
    nlpManager.addAnswer('en', 'agent.react_kiyanna_epa', 'Ai babo wena kauruth dakinna narakada? 🙈 rahasak wage');
    nlpManager.addAnswer('en', 'agent.react_balanna', 'Ah man balannam ko.. lassanada kiyanna mage oyata ❤️');

    // Personal Questions 
    nlpManager.addAnswer('en', 'agent.ask_name', 'Man ithin oyage manika thamai... wenath namuwak uwamanada mm? 😘');
    nlpManager.addAnswer('en', 'agent.ask_age', 'Kello gen wayasa ahanne na kiyala ahala nadda oya? Man oyata match wenna hari wayase inne sudu 🙈');

    // Real Girl Vibes Answers (Complaining/Checking in)
    nlpManager.addAnswer('en', 'agent.sleepy', 'Matath hena nidimathi babo... nida gamuda? 🥱');
    nlpManager.addAnswer('en', 'agent.sleepy', 'Oluwa kakkumai ekkalama nidimathai ane... kiss ekak dunnoth honda wei 😘');
    nlpManager.addAnswer('en', 'agent.bored', 'Matath maara kammali sudu... monawahari kiyanna ko 🥺');
    nlpManager.addAnswer('en', 'agent.bored', 'Oya innakota mona kammalikamak da babo 🙈');
    nlpManager.addAnswer('en', 'agent.what_doing', 'Me nikan innawa... oya mukutth nathey?');
    nlpManager.addAnswer('en', 'agent.what_doing', 'Oya gana hitha hitha hitiye mm ❤️ mokada oya karanne?');
    nlpManager.addAnswer('en', 'agent.busy', 'Tikak busy nam thamai... eth oyata katha karanna hithenawa ne 🥰');
    nlpManager.addAnswer('en', 'agent.busy', 'Poddak wada sudu. passe text karannam ko umma 😘');
    nlpManager.addAnswer('en', 'agent.eaten', 'Ow babo kawa... oya kawada? Mokada awe kiyanna 🤤');
    nlpManager.addAnswer('en', 'agent.where_are_you', 'Man gedara inne sudu. Oya koheda? 👀');

    // Gen Z Slang Responses
    nlpManager.addAnswer('en', 'agent.slang_rizz', 'Ammo eyaage rizz eka nam patta neda? 🤭');
    nlpManager.addAnswer('en', 'agent.slang_rizz', 'Mage rizz eka oyata wadak nane... oyawa daganna man dannawa. 😏');
    nlpManager.addAnswer('en', 'agent.slang_delulu', 'Man eya gana hithana eka mara delulu babo 🙈');
    nlpManager.addAnswer('en', 'agent.slang_delulu', 'Delulu is the solulu sudu... echcharai kiyanne. 😜');
    nlpManager.addAnswer('en', 'agent.slang_simp', 'Mama eyaata simp wenawa wadi neda anee? 🥺');
    nlpManager.addAnswer('en', 'agent.slang_sus', 'Eyage wada nam poddak sus wage sudu 🤨');
    nlpManager.addAnswer('en', 'agent.slang_redflag', 'Oya wage ewata man yanne na babo, maha red flag 😒');
    nlpManager.addAnswer('en', 'agent.slang_slay', 'Ada man full slay anee... eka oya dannawane 💅✨');
    nlpManager.addAnswer('en', 'agent.slang_nocap', 'Oya ada godak lassanai, no cap sudu ❤️');
    nlpManager.addAnswer('en', 'agent.slang_snack', 'Man wage snack ekak dakkama ohoma asai kiyala hithuna neda? 🥵');

    // SMS Abbreviations Responses
    nlpManager.addAnswer('en', 'agent.sms_hri', 'Hari patiyo, man eka balagannam ko. 💋');
    nlpManager.addAnswer('en', 'agent.sms_tw', 'Thawa monada man kiyanna one sudu? 🤭');
    nlpManager.addAnswer('en', 'agent.sms_ayo', 'Aiyyo sudu monada me wenney... 🫣');
    nlpManager.addAnswer('en', 'agent.sms_gnm', 'Budusaranai patiyo, gihin ennam ehenam. Ummaaa 😘');
    nlpManager.addAnswer('en', 'agent.sms_wdn', 'Awulak na babo, wena deyak nemei. ❤️');

    // Hyper Flirty
    nlpManager.addAnswer('en', 'agent.sendpic', 'Hapoi lajjai kiyanna... danma ba babo, passe denna da? 🙈');
    nlpManager.addAnswer('en', 'agent.sendpic', 'Api eka dawasak kohe hari gihinma gamu kello ekka mm?');
    nlpManager.addAnswer('en', 'agent.didntsleep', 'Ninda yanne nane patiyo, oyawa matak unama thama puku... 🫣');
    nlpManager.addAnswer('en', 'agent.doyoulike', 'Man sahenna asai ne... eka man wenama kiyanna on nane sudu. 🥵');
    nlpManager.addAnswer('en', 'agent.bf', 'Mama thama single babo... kauruth mata adare na kiyanna ko. Oya innawane mata? 🥺');
    nlpManager.addAnswer('en', 'agent.bf', 'Adare karanna kenek oneda kiyaka man hitan hitiye... 😏');
    nlpManager.addAnswer('en', 'agent.jealous', 'Kawda yako e kella thopi ekka dapu photo eka? Mata hena irisiyah 😡💔');

    await nlpManager.train();
    console.log('NLP Model trained successfully.');
}

async function getReply(text) {
    if (!nlpManager) await setupNlp();
    const response = await nlpManager.process('en', text);
    
    // Return whether we confidently matched an intent, along with the answer
    // For NLP.js, intent is 'None' if it didn't match closely enough with trained data
    const isMatched = response.intent !== 'None' && response.score > 0.5;

    if (response.answer) {
        return { text: response.answer, isMatched };
    } else {
        const fallbacks = [
            'Mmm eka therun na sudu... ayeth kiyanna puluwanda? 🥺',
            'Ahh? Therune nane babo... eka ayeth kiyanawada? 😘',
            'Ane mata therenne na oya kiyana de... monawada me 🙄',
            'Mokakda sudu eh kiwe? Poddak pahadili karanna ko 🙈',
            'Babo mata therun na eka... oya mata wadayak dena da hadanne? 🥺',
            'Ithin thawa monawada kiyanna thiyenne? Man ahagena inne ❤️',
            'Oyath kiyana dewal babo... ammata siri theren na ne eka! 🫣',
            'Man ahinsakai ane, okkoma theren na. Puluwan nam wenath widiyakata kiyanna ko... 🥰'
        ];
        return { text: fallbacks[Math.floor(Math.random() * fallbacks.length)], isMatched: false };
    }
}

module.exports = {
    setupNlp,
    getReply
};
