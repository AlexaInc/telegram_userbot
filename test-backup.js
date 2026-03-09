require('dotenv').config();
const { performBackup } = require('./backup.js');

(async () => {
    console.log('Testing backup module...');
    try {
        const result = await performBackup();
        console.log('Result:', result);
    } catch (e) {
        console.error('Test failed:', e);
    }
    process.exit(0);
})();
