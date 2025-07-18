const Database = require("better-sqlite3");
const db = new Database("dictionary.db");
const { MeiliSearch } = require("meilisearch");

// Initialize Meilisearch client
const client = new MeiliSearch({
    host: "http://localhost:7700",
    apiKey: "az-dict-key",
});

const index = client.index("words");

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT UNIQUE,
    definition TEXT,
    part_of_speech TEXT,
    synonyms TEXT,
    antonyms TEXT,
    suffixes TEXT
  );
`);

// Sample Azerbaijani words
const words = [
    {
        word: "kitab",
        definition: "Yazılı və ya çap edilmiş məlumatların toplandığı əsər.",
        part_of_speech: "isim",
        synonyms: "əsər, yazı",
        antonyms: "səssizlik",
        suffixes: "-lıq, -çı",
    },
    {
        word: "gözəl",
        definition: "Estetik cəhətdən xoş görünən; yaraşıqlı.",
        part_of_speech: "sifət",
        synonyms: "yaraşıqlı, cazibədar",
        antonyms: "çirkin, eybəcər",
        suffixes: "-lik, -cə",
    },
    {
        word: "qaçmaq",
        definition: "Tez bir şəkildə hərəkət edərək bir yerdən uzaqlaşmaq.",
        part_of_speech: "fel",
        synonyms: "yüyürmək, uzaqlaşmaq",
        antonyms: "dayanmaq, qalmaq",
        suffixes: "-an, -ış",
    },
];

// Insert words into SQLite
const insert = db.prepare(`
  INSERT OR IGNORE INTO words (word, definition, part_of_speech, synonyms, antonyms, suffixes)
  VALUES (@word, @definition, @part_of_speech, @synonyms, @antonyms, @suffixes)
`);

const insertMany = db.transaction((words) => {
    for (const word of words) insert.run(word);
});

insertMany(words);

// Index words into Meilisearch
async function indexWords() {
    const documents = words.map((word) => ({
        id: word.word,
        word: word.word,
        definition: word.definition,
        part_of_speech: word.part_of_speech,
    }));

    await index.addDocuments(documents);
    console.log("🔍 Indexed words into Meilisearch.");
}

indexWords().then(() => {
    console.log("✅ Seeded dictionary.db with sample Azerbaijani words.");
});
