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
	test('It should throw a custom error with a custom body', async () => {
		expect.assertions(1);
		await expect(
			userInputErrorRejection(customErrorMessage, customErrorBody),
		).rejects.toEqual({
			code: '#user_input_error',
			message: customErrorMessage,
			body: customErrorBody,
		});
	});

	test('It should throw an error if a body is not passed', () => {
		expect(() => {
			return userInputErrorRejection(customErrorMessage);
		}).toThrow(missingBodyError);
	});
});

describe('Tests should correctly throw a Connector Error with a body', () => {
	test('It should throw a custom error with a custom body', async () => {
		expect.assertions(1);
		await expect(
			connectorErrorRejection(customErrorMessage, customErrorBody),
		).rejects.toEqual({
			code: '#connector_error',
			message: customErrorMessage,
			body: customErrorBody,
		});
	});

	test('It should throw an error if a body is not passed', () => {
		expect(() => {
			return connectorErrorRejection(customErrorMessage);
		}).toThrow(missingBodyError);
	});
});

describe('Tests should correctly throw an API error with a body', () => {
	test('It should throw a custom error with a custom body', async () => {
		expect.assertions(1);
		await expect(
			apiErrorRejection(customErrorMessage, customErrorBody),
		).rejects.toEqual({
			code: '#api_error',
			message: customErrorMessage,
			body: customErrorBody,
		});
	});

	test('It should throw an error if a body is not passed', () => {
		expect(() => {
			return apiErrorRejection(customErrorMessage);
		}).toThrow(missingBodyError);
	});
});

describe('Tests should correctly throw an oAuth Refresh Error with a body', () => {
	test('It should throw a custom error with a custom body', async () => {
		expect.assertions(1);
		await expect(
			oauthErrorRejection(customErrorMessage, customErrorBody),
		).rejects.toEqual({
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
	test('It should throw a custom error with a custom body', async () => {
		expect.assertions(1);
		await expect(
			noTriggerErrorRejection(customErrorMessage, customErrorBody),
		).rejects.toEqual({
			code: '#no_trigger',
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
