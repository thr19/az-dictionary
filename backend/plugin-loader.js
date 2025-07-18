// backend/plugin-loader.js
const fs = require("fs");
const path = require("path");

function loadPlugins() {
	const pluginDir = path.join(__dirname, "plugins");
	const plugins = {};

	fs.readdirSync(pluginDir).forEach((file) => {
		const pluginPath = path.join(pluginDir, file);
		const plugin = require(pluginPath);
		if (plugin.name) {
			plugins[plugin.name] = plugin;
		}
	});

	return plugins;
}

module.exports = { loadPlugins };
