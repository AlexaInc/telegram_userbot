const singlish = require('singlish-to-sinhala');

const phrases = [
    'kohomada',
    'khomada',
    'adareida',
    'bokka',
    'kammali',
    'mokakda karanne',
    'oyata adarei'
];

for (const phrase of phrases) {
    const unicode = singlish.singlishToSinhala(phrase);
    console.log(`${phrase} -> ${unicode}`);
}
