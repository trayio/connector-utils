module.exports = {
	env: {
		node: true,
		es6: true,
		jest: true,
	},
	plugins: ['jest'],
	extends: ['airbnb-base', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'jest/no-disabled-tests': 'error',
		'jest/no-focused-tests': 'error',
		'jest/no-identical-title': 'error',
		camelcase: 'off',
	},
};
