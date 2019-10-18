const ERROR_MESSAGES = {
	USER_INPUT: 'Invalid input.',
	CONNECTOR: 'An issue has occurred with the connector.',
	API: 'An issue has occurred with the API.',
	OAUTH: 'oAuth token invalid.',
	NO_TRIGGER: 'The trigger request was ignored.',
};
const ERROR_CODES = {
	USER_INPUT: '#user_input_error',
	CONNECTOR: '#connector_error',
	API: '#api_error',
	OAUTH: '#oauth_refresh',
	NO_TRIGGER: '#no_trigger',
};

/** Class representing the base error for all connector errors
 * @extends Error
 */
class GenericError extends Error {
	constructor(...errorArgs) {
		super(...errorArgs);

		// Maintains proper stack trace for where the error was thrown
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}

		this.name = this.constructor.name;
	}
}

/** Class representing a UserInputError
 * @extends GenericError
 */
class UserInputError extends GenericError {
	/**
	 * Custom error to throw for issues concerning User Input.
	 *
	 * @param {String} message Custom error message to return.
	 * @param  {...any} errorArgs Error args allowing for extra parameters native to the normal Error class.
	 */
	constructor(message = ERROR_MESSAGES.USER_INPUT, ...errorArgs) {
		super(message, ...errorArgs);

		this.code = ERROR_CODES.USER_INPUT;
	}
}

/** Class representing a ConnectorError
 * @extends GenericError
 */
class ConnectorError extends GenericError {
	/**
	 * Custom error to throw for issues concerning the Connector.
	 *
	 * @param {String} message Custom error message to return.
	 * @param  {...any} errorArgs Error args allowing for extra parameters native to the normal Error class.
	 */
	constructor(message = ERROR_MESSAGES.CONNECTOR, ...errorArgs) {
		super(message, ...errorArgs);

		this.code = ERROR_CODES.CONNECTOR;
	}
}

/** Class representing a ConnectorError
 * @extends GenericError
 */
class ApiError extends GenericError {
	/**
	 * Custom error to throw for issues concerning the Api;;.
	 *
	 * @param {String} message Custom error message to return.
	 * @param  {...any} errorArgs Error args allowing for extra parameters native to the normal Error class.
	 */
	constructor(message = ERROR_MESSAGES.API, ...errorArgs) {
		super(message, ...errorArgs);

		this.code = ERROR_CODES.API;
	}
}

/** Class representing a ConnectorError
 * @extends GenericError
 */
class OAuthRefresh extends GenericError {
	/**
	 * Custom error to throw when an oAuth token has expired.
	 *
	 * @param {String} message Custom error message to return.
	 * @param  {...any} errorArgs Error args allowing for extra parameters native to the normal Error class.
	 */
	constructor(message = ERROR_MESSAGES.OAUTH, ...errorArgs) {
		super(message, ...errorArgs);

		this.code = ERROR_CODES.OAUTH;
	}
}

/** Class representing a ConnectorError
 * @extends GenericError
 */
class NoTriggerError extends GenericError {
	/**
	 * Custom error to throw for issues when a trigger request is ignored.
	 *
	 * @param {String} message Custom error message to return.
	 * @param  {...any} errorArgs Error args allowing for extra parameters native to the normal Error class.
	 */
	constructor(message = ERROR_MESSAGES.NO_TRIGGER, ...errorArgs) {
		super(message, ...errorArgs);

		this.code = ERROR_CODES.NO_TRIGGER;
	}
}

module.exports = {
	UserInputError,
	ConnectorError,
	ApiError,
	OAuthRefresh,
	NoTriggerError,
};
