// backend/plugins/suffixes.js
module.exports = {
	name: "suffixes",
	rules: {
		"-lıq": "isim düzəldən suffiks",
		"-çı": "peşə və ya funksiya bildirir",
		"-lik": "keyfiyyət və ya məkan bildirir",
		"-cə": "kiçiltmə və ya oxşarlıq bildirir",
		"-an": "felin sifət forması",
		"-ış": "felin nəticə və ya hal forması",
	},
	explain(suffix) {
		return this.rules[suffix] || "Qaydası tapılmadı";
	},
};
