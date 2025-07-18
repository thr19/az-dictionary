// backend/db.js
const Database = require('better-sqlite3');
const db = new Database('dictionary.db');

function getWord(term) {
  return db.prepare('SELECT * FROM words WHERE LOWER(word) = ?').get(term);
}

module.exports = { getWord };
