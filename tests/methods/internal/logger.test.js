/* eslint-disable no-console */
const logger = require('../../../lib/internal/logger');

describe('Logger should emulate console logging', () => {
	beforeAll(() => {
		console.error = jest.fn();
		console.table = jest.fn();
		console.warn = jest.fn();
	});
	afterAll(() => {
		console.error.mockClear();
		console.table.mockClear();
		console.warn.mockClear();
	});

	test('It should log errors', () => {
		const msg = 'error message';
		const spy = jest.spyOn(console, 'error');
		logger.log('error', msg);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(msg);
		spy.mockRestore();
	});

	test('It should log warnings', () => {
		const msg = 'warning message';
		const spy = jest.spyOn(console, 'warn');
		logger.log('warn', msg);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(msg);
		spy.mockRestore();
	});

	test('It should log table data', () => {
		const tableData = [
			{ a: 1, b: 'Y' },
			{ a: 'Z', b: 2 },
		];
		const spy = jest.spyOn(console, 'table');
		logger.log('table', tableData);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(tableData);
		spy.mockRestore();
	});
});
