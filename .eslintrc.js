module.exports = {
	env: {
		node: true,
		es6: true,
		jest: true,
	},
	plugins: ['jest', 'no-autofix'],
	extends: ['airbnb-base', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'jest/no-disabled-tests': 'error',
		'jest/no-focused-tests': 'error',
		'jest/no-identical-title': 'error',
		'import/no-extraneous-dependencies': [
			'warn',
			{ devDependencies: ['requests/*', 'tests/*', '**/*.test.js'] },
		],
		'import/no-unresolved': 'off',
		'no-unused-vars': ['error', { args: 'none' }],
		camelcase: 'off',
		'no-var': 'off',
	},
};
