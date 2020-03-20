const testRunner = require('@trayio/connector-test-runner');
const logger = require('../../lib/internal/logger');

describe('Test runner', () => {
	beforeAll(() => {
		logger.log = jest.fn();
	});
	afterAll(() => {
		logger.log.mockClear();
	});
	testRunner.run(`${__dirname}/tests/`, `${__dirname}/app/`);
});
