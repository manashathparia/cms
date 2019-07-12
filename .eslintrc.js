module.exports = {
	extends: ["eslint:recommended", "prettier"],
	plugins: ["flowtype"],
	rules: {
		"no-console": 0
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true
		}
	},
	env: {
		es6: true,
		browser: false,
		node: true
	}
};
