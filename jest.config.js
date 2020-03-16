// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	// A list of paths to modules that run some code to configure or set up the testing framework before each test.
	coverageDirectory: 'coverage',
	reporters: ['default'],
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/'],
	verbose: true,
};
