const {
	userInputErrorRejection,
	connectorErrorRejection,
	apiErrorRejection,
	oauthErrorRejection,
	noTriggerErrorRejection,
} = require('../../lib/index').error;

const missingBodyError = `Argument Error: Error functions require a 'body' argument. Throw appropriate class Error if body is not required.`;
const customErrorMessage = 'A custom error message.';
const customErrorBody = {
	key: 'some',
	key1: 'body',
};

describe('Tests should correctly throw a User Input Error with a body', () => {
	test('It should throw a custom error with a custom body', () => {
		expect(() => {
			throw userInputErrorRejection(customErrorMessage, customErrorBody);
		}).toThrow({
			code: '#user_input_error',
			message: customErrorMessage,
			body: customErrorBody,
		});
	});

	test('It should throw an error if a body is not passed', () => {
		expect(() => {
			throw userInputErrorRejection(customErrorMessage);
		}).toThrow(missingBodyError);
	});
});

describe('Tests should correctly throw a Connector Error with a body', () => {
	test('It should throw a custom error with a custom body', () => {
		expect(() => {
			throw connectorErrorRejection(customErrorMessage, customErrorBody);
		}).toThrow({
			code: '#connector_error',
			message: customErrorMessage,
			body: customErrorBody,
		});
	});

	test('It should throw an error if a body is not passed', () => {
		expect(() => {
			throw connectorErrorRejection(customErrorMessage);
		}).toThrow(missingBodyError);
	});
});

describe('Tests should correctly throw an API error with a body', () => {
	test('It should throw a custom error with a custom body', () => {
		expect(() => {
			throw apiErrorRejection(customErrorMessage, customErrorBody);
		}).toThrow({
			code: '#api_error',
			message: customErrorMessage,
			body: customErrorBody,
		});
	});

	test('It should throw an error if a body is not passed', () => {
		expect(() => {
			throw apiErrorRejection(customErrorMessage);
		}).toThrow(missingBodyError);
	});
});

describe('Tests should correctly throw an oAuth Refresh Error with a body', () => {
	test('It should throw a custom error with a custom body', () => {
		expect(() => {
			throw oauthErrorRejection(customErrorMessage, customErrorBody);
		}).toThrow({
			code: '#oauth_refresh',
			message: customErrorMessage,
			body: customErrorBody,
		});
	});

	test('It should throw an error if a body is not passed', () => {
		expect(() => {
			throw oauthErrorRejection(customErrorMessage);
		}).toThrow(missingBodyError);
	});
});

describe('Tests should correctly throw an No Trigger Error with a body', () => {
	test('It should throw a custom error with a custom body', () => {
		expect(() => {
			throw noTriggerErrorRejection(customErrorMessage, customErrorBody);
		}).toThrow({
			code: '#no_trigger_error',
			message: customErrorMessage,
			body: customErrorBody,
		});
	});

	test('It should throw an error if a body is not passed', () => {
		expect(() => {
			throw noTriggerErrorRejection(customErrorMessage);
		}).toThrow(missingBodyError);
	});
});
