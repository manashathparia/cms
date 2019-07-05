module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:import/errors",
		"plugin:react/recommended",
		"plugin:jsx-a11y/recommended",
		"prettier",
		"prettier/react"
	],
	rules: {
		"react/prop-types": 0,
		"no-console": 0
	},
	plugins: ["react", "import", "jsx-a11y"],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true
		}
	},
	parser: "babel-eslint",
	env: {
		es6: true,
		browser: true,
		node: true
	}
};
