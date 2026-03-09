const fs = require('fs');
const file = 'nlp.js';
let content = fs.readFileSync(file, 'utf8');

// The lines we want to keep as `nlpManager.addDocument` are inside the addDoc function.
const originalAddDoc = 'function addDoc(lang, text, intent) {\n    nlpManager.addDocument(lang, text, intent);\n    const unicodeText = singlishToUnicode(text);\n    if (unicodeText && unicodeText !== text) {\n        nlpManager.addDocument(lang, unicodeText, intent);\n    }\n}';

// First, replace ALL nlpManager.addDocument
content = content.replace(/nlpManager\.addDocument/g, 'addDoc');

// Then restore the ones inside the addDoc function
const brokenAddDoc = 'function addDoc(lang, text, intent) {\n    addDoc(lang, text, intent);\n    const unicodeText = singlishToUnicode(text);\n    if (unicodeText && unicodeText !== text) {\n        addDoc(lang, unicodeText, intent);\n    }\n}';
content = content.replace(brokenAddDoc, originalAddDoc);

fs.writeFileSync(file, content);
console.log('Replaced successfully.');
