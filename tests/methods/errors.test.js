const {
	UserInputError,
	ConnectorError,
	ApiError,
	OAuthRefresh,
	NoTriggerError,
} = require('../../lib/errors');

describe('Should throw a the correct error where appropriate', () => {
	const customMessage = 'custom error message';
	const body = {
		key: 'some info',
	};

	test('It should throw a basic error when called', () => {
		expect(() => {
			throw new UserInputError();
		}).toThrow(UserInputError);
		expect(() => {
			throw new ConnectorError();
		}).toThrow(ConnectorError);
		expect(() => {
			throw new ApiError();
		}).toThrow(ApiError);
		expect(() => {
			throw new OAuthRefresh();
		}).toThrow(OAuthRefresh);
		expect(() => {
			throw new NoTriggerError();
		}).toThrow(NoTriggerError);
	});

	test('It should throw a custom error when a custom error is passed', () => {
		expect(() => {
			throw new UserInputError(customMessage);
		}).toThrow(customMessage);
		expect(() => {
			throw new ConnectorError(customMessage);
		}).toThrow(customMessage);
		expect(() => {
			throw new ApiError(customMessage);
		}).toThrow(customMessage);
		expect(() => {
			throw new OAuthRefresh(customMessage);
		}).toThrow(customMessage);
		expect(() => {
			throw new NoTriggerError(customMessage);
		}).toThrow(customMessage);
	});
	test('It should include the correct error name in the stack trace.', () => {
		const errors = [
			UserInputError,
			ConnectorError,
			ApiError,
			OAuthRefresh,
			NoTriggerError,
		];
		const generateError = errorType => {
			throw new errorType(customMessage);
		};
		errors.forEach(err => {
			try {
				generateError(err);
			} catch (e) {
				expect(e.name).toBe(err.name);
			}
		});
	});
	test('It should include a body if one is passed', () => {
		expect(() => {
			throw new UserInputError(customMessage, body);
		}).toThrow(customMessage, body);
		expect(() => {
			throw new ConnectorError(customMessage, body);
		}).toThrow(customMessage, body);
		expect(() => {
			throw new ApiError(customMessage, body);
		}).toThrow(customMessage, body);
		expect(() => {
			throw new OAuthRefresh(customMessage, body);
		}).toThrow(customMessage, body);
		expect(() => {
			throw new NoTriggerError(customMessage, body);
		}).toThrow(customMessage, body);
	});
});
