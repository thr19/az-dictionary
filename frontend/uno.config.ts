// uno.config.ts
import { defineConfig, presetUno, presetIcons, presetTypography } from "unocss";

export default defineConfig({
	presets: [presetUno(), presetIcons(), presetTypography()],
	theme: {
		colors: {
			primary: "#00ffe0",
			accent: "#ff00aa",
			bg: "#0f0f0f",
			text: "#e0e0e0",
		},
		fontFamily: {
			futuristic: ['"JetBrains Mono"', "monospace"],
		},
	},
	shortcuts: {
		btn: "px-4 py-2 rounded bg-primary text-black hover:bg-accent transition",
		card: "p-4 rounded-lg shadow-lg bg-bg text-text",
		title: "text-2xl font-bold text-primary font-futuristic",
	},
});
