const {
	UserInputError,
	ConnectorError,
	ApiError,
	OAuthRefresh,
	NoTriggerError,
} = require('../../lib/index').error;

const customMessage = 'custom error message';
const body = {
	key: 'some info',
};
const generateError = errorType => {
	throw new errorType(customMessage);
};

// TODO: update test to check for body

// * User Input Error

describe('Should throw a User Input Error where appropriate', () => {
	test('It should throw a basic error when called', () => {
		expect(() => {
			throw new UserInputError();
		}).toThrow(UserInputError);
	});

	test('It should throw a custom error when a custom error is passed', () => {
		expect(() => {
			throw new UserInputError(customMessage);
		}).toThrow(customMessage);
	});
	test('It should include the correct error name in the stack trace.', () => {
		try {
			generateError(UserInputError);
		} catch (e) {
			expect(e.name).toBe(UserInputError.name);
		}
	});
	test('It should include a body if one is passed', () => {
		expect(() => {
			throw new UserInputError(customMessage, body);
		}).toThrow(customMessage, body);
	});
});

// * Connector Error

describe('Should throw a Connector Error where appropriate', () => {
	test('It should throw a basic error when called', () => {
		expect(() => {
			throw new ConnectorError();
		}).toThrow(ConnectorError);
	});

	test('It should throw a custom error when a custom error is passed', () => {
		expect(() => {
			throw new ConnectorError(customMessage);
		}).toThrow(customMessage);
	});
	test('It should include the correct error name in the stack trace.', () => {
		try {
			generateError(ConnectorError);
		} catch (e) {
			expect(e.name).toBe(ConnectorError.name);
		}
	});
	test('It should include a body if one is passed', () => {
		expect(() => {
			throw new ConnectorError(customMessage, body);
		}).toThrow(customMessage, body);
	});
});

// * API Error

describe('Should throw an API Error where appropriate', () => {
	test('It should throw a basic error when called', () => {
		expect(() => {
			throw new ApiError();
		}).toThrow(ApiError);
	});

	test('It should throw a custom error when a custom error is passed', () => {
		expect(() => {
			throw new ApiError(customMessage);
		}).toThrow(customMessage);
	});
	test('It should include the correct error name in the stack trace.', () => {
		try {
			generateError(UserInputError);
		} catch (e) {
			expect(e.name).toBe(UserInputError.name);
		}
	});
	test('It should include a body if one is passed', () => {
		expect(() => {
			throw new ApiError(customMessage, body);
		}).toThrow(customMessage, body);
	});
});

// * oAuth Refresh Error

describe('Should throw an oAuth Refresh Error where appropriate', () => {
	test('It should throw a basic error when called', () => {
		expect(() => {
			throw new OAuthRefresh();
		}).toThrow(OAuthRefresh);
	});

	test('It should throw a custom error when a custom error is passed', () => {
		expect(() => {
			throw new OAuthRefresh(customMessage);
		}).toThrow(customMessage);
	});
	test('It should include the correct error name in the stack trace.', () => {
		try {
			generateError(OAuthRefresh);
		} catch (e) {
			expect(e.name).toBe(OAuthRefresh.name);
		}
	});
	test('It should include a body if one is passed', () => {
		expect(() => {
			throw new OAuthRefresh(customMessage, body);
		}).toThrow(customMessage, body);
	});
});

// * No Trigger Error

describe('Should throw a No Trigger Error where appropriate', () => {
	test('It should throw a basic error when called', () => {
		expect(() => {
			throw new NoTriggerError();
		}).toThrow(NoTriggerError);
	});

	test('It should throw a custom error when a custom error is passed', () => {
		expect(() => {
			throw new NoTriggerError(customMessage);
		}).toThrow(customMessage);
	});
	test('It should include the correct error name in the stack trace.', () => {
		try {
			generateError(NoTriggerError);
		} catch (e) {
			expect(e.name).toBe(NoTriggerError.name);
		}
	});
	test('It should include a body if one is passed', () => {
		expect(() => {
			throw new NoTriggerError(customMessage, body);
		}).toThrow(customMessage, body);
	});
});
