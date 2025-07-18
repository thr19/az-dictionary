const Fastify = require("fastify");
const db = require("./db");
const { loadPlugins } = require("./plugin-loader");

const fastify = Fastify({ logger: true });
const plugins = loadPlugins();

const { searchWords } = require("./search");

fastify.register(require("./routes/admin"));

fastify.get("/api/search", async (req, reply) => {
	const q = req.query.q;
	if (!q) return reply.code(400).send({ error: "Missing query" });

	const results = await searchWords(q);
	reply.send(results);
});

// Route: GET /api/word/:term
fastify.get("/api/word/:term", async (req, reply) => {
	const term = req.params.term.toLowerCase();
	const word = db.getWord(term);

	if (!word) {
		return reply.code(404).send({ error: "Word not found" });
	}

	// Convert comma-separated strings to arrays
	word.synonyms = word.synonyms?.split(",").map((s) => s.trim()) || [];
	word.antonyms = word.antonyms?.split(",").map((a) => a.trim()) || [];
	word.suffixes = word.suffixes?.split(",").map((s) => s.trim()) || [];

	reply.send(word);
});

// Route: GET /api/suffix/:suffix
fastify.get("/api/suffix/:suffix", async (req, reply) => {
	const suffix = req.params.suffix;
	const explanation = plugins.suffixes?.explain(suffix);

	if (!explanation) {
		return reply.code(404).send({ error: "Suffix rule not found" });
	}

	reply.send({ suffix, explanation });
});

// Start server
fastify.listen({ port: 3000 }, (err) => {
	if (err) throw err;
	console.log("🚀 Server running at http://localhost:3000");
});
