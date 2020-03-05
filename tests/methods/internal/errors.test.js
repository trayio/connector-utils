const { XMLError, DDLError } = require('../../../lib/internal/errors');

describe('Tests should correctly throw XML errors', () => {
	test('It should throw a basic XML error with default message', () => {
		const err = () => {
			throw new XMLError();
		};
		expect(err).toThrow(XMLError);
	});
	test('It should throw a basic XML error with a custom message', () => {
		const err = () => {
			throw new XMLError('Custom error');
		};
		expect(err).toThrow('Custom error');
	});
});
