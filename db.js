const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'bot_data.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite database.');
        initDb();
    }
});

function initDb() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        interaction_count INTEGER DEFAULT 0
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY,
        title TEXT,
        interaction_count INTEGER DEFAULT 0
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS knowledge (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        intent TEXT,
        utterance TEXT,
        response TEXT,
        is_trained INTEGER DEFAULT 0
    )`);

    // Ensure is_trained exists for existing databases
    db.run(`ALTER TABLE knowledge ADD COLUMN is_trained INTEGER DEFAULT 0`, (err) => {
        // Ignore error if column already exists
    });
}

function recordInteraction(userId, username, groupId, groupTitle) {
    db.run(`INSERT INTO users (id, username, interaction_count)
            VALUES (?, ?, 1)
            ON CONFLICT(id) DO UPDATE SET
            username=excluded.username,
            interaction_count=interaction_count+1`, [userId, username]);

    db.run(`INSERT INTO groups (id, title, interaction_count)
            VALUES (?, ?, 1)
            ON CONFLICT(id) DO UPDATE SET
            title=excluded.title,
            interaction_count=interaction_count+1`, [groupId, groupTitle]);
}

// Save a newly learned Utterance -> Response pair
function saveLearnedPair(intentName, utterance, response) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO knowledge (intent, utterance, response, is_trained) VALUES (?, ?, ?, 0)`,
            [intentName, utterance, response], function (err) {
                if (err) return reject(err);
                resolve(this.lastID);
            });
    });
}

// Load previously learned pairs. By default loads all for startup, 
// but can be filtered for manual training.
function loadLearnedKnowledge(onlyTrained = false, onlyPending = false) {
    return new Promise((resolve, reject) => {
        let query = `SELECT intent, utterance, response FROM knowledge`;
        if (onlyTrained) query += ` WHERE is_trained = 1`;
        if (onlyPending) query += ` WHERE is_trained = 0`;

        db.all(query, [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

function markAsTrained() {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE knowledge SET is_trained = 1 WHERE is_trained = 0`, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

// Sync learned knowledge from GitHub (bulk insert if not exists)
function syncLearnedKnowledge(knowledgeArray) {
    return new Promise((resolve, reject) => {
        if (!knowledgeArray || !Array.isArray(knowledgeArray)) return resolve();

        const stmt = db.prepare(`INSERT INTO knowledge (intent, utterance, response) 
                                 SELECT ?, ?, ? 
                                 WHERE NOT EXISTS (SELECT 1 FROM knowledge WHERE intent = ?)`);

        db.serialize(() => {
            knowledgeArray.forEach(item => {
                stmt.run(item.intent, item.utterance, item.response, item.intent);
            });
            stmt.finalize((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    });
}

module.exports = {
    db,
    recordInteraction,
    saveLearnedPair,
    loadLearnedKnowledge,
    syncLearnedKnowledge,
    markAsTrained
};
