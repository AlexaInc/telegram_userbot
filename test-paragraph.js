const { getReply, setupNlp } = require('./nlp.js');

(async () => {
    console.log('Testing paragraph parser...');
    await setupNlp();

    const paragraph = 'hi machan. kohomada? wada set da. mokakda karanne. photo ekak ewanna';
    console.log(`\nInput Paragraph: "${paragraph}"\n`);

    const result = await getReply(paragraph);
    console.log('Final Combined Response:', result);
    process.exit(0);
})();
