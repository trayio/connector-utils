const { ConnectorError } = require('../../../lib/errors');

describe('Should throw a Connector Error where appropriate', () => {
	test('It should throw a basic error when called', () => {
		const err = () => {
			throw new ConnectorError();
		};
		expect(err).toThrow(ConnectorError);
	});

	test('It should throw a custom error when custom error is passed', () => {
		const err = () => {
			throw new ConnectorError('custom error message');
		};
		expect(err).toThrow('custom error message');
	});
	test('It should include the correct error name in the stack trace.', () => {
		const err = () => {
			throw new ConnectorError('custom error message');
		};
		try {
			err();
		} catch (e) {
			console.log(e.stack);
			expect(e.name).toBe('ConnectorError');
		}
	});
	test('It should include a body if one is passed', () => {
		const body = {
			key: 'some info',
		};
		const err = () => {
			throw new ConnectorError('custom error message', body);
		};
		expect(err).toThrow('custom error message', body);
	});
});
