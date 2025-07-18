// backend/search.js
const { MeiliSearch } = require("meilisearch");

const client = new MeiliSearch({
	host: "http://localhost:7700",
	apiKey: "az-dict-key",
});

const index = client.index("words");

async function indexWord(word) {
	await index.addDocuments([word]);
}

async function searchWords(query) {
	const results = await index.search(query);
	return results.hits;
}

module.exports = { indexWord, searchWords };
