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
        response TEXT
    )`);
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

module.exports = {
    db,
    recordInteraction
};
