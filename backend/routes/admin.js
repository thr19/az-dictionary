const db = require("../db");

function registerAdminRoutes(fastify, opts, done) {
	fastify.post("/api/admin/word", async (req, reply) => {
		const word = req.body;

		const insert = db.prepare(`
      INSERT OR REPLACE INTO words (word, definition, part_of_speech, synonyms, antonyms, suffixes)
      VALUES (@word, @definition, @part_of_speech, @synonyms, @antonyms, @suffixes)
    `);

		insert.run(word);
		reply.send({ success: true });
	});

	done();
}

module.exports = registerAdminRoutes;
