/* eslint-disable max-classes-per-file */
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

const baseRejectionWithBody = (code, message, body) => {
	if (!body) {
		throw new Error(
			`Argument Error: Error functions require a 'body' argument. Throw appropriate class Error if body is not required.`,
		);
	}
	// eslint-disable-next-line prefer-promise-reject-errors
	return Promise.reject({
		code,
		message,
		body,
	});
};

/**
 * Return a User Input Error with option to pass a body argument.
 * The use case for this over the custom Error class is to pass a body to provide error context.
 *
 * @param {String} message The error message to be returned.
 * @param {any} body Custom body to be returned when providing more error context.
 */

const userInputErrorRejection = (message = ERROR_MESSAGES.USER_INPUT, body) => {
	return baseRejectionWithBody(ERROR_CODES.USER_INPUT, message, body);
};

/**
 * Return a Connector Error with option to pass a body argument.
 * The use case for this over the custom Error class is to pass a body to provide error context.
 *
 * @param {String} message The error message to be returned.
 * @param {any} body Custom body to be returned when providing more error context.
 */

const connectorErrorRejection = (message = ERROR_MESSAGES.CONNECTOR, body) => {
	return baseRejectionWithBody(ERROR_CODES.CONNECTOR, message, body);
};

/**
 * Return a API Error with option to pass a body argument.
 * The use case for this over the custom Error class is to pass a body to provide error context.
 *
 * @param {String} message The error message to be returned.
 * @param {any} body Custom body to be returned when providing more error context.
 */

const apiErrorRejection = (message = ERROR_MESSAGES.API, body) => {
	return baseRejectionWithBody(ERROR_CODES.API, message, body);
};

/**
 * Return a oAuth Error with option to pass a body argument.
 * The use case for this over the custom Error class is to pass a body to provide error context.
 *
 * @param {String} message The error message to be returned.
 * @param {any} body Custom body to be returned when providing more error context.
 */

const oauthErrorRejection = (message = ERROR_MESSAGES.OAUTH, body) => {
	return baseRejectionWithBody(ERROR_CODES.OAUTH, message, body);
};

/**
 * Return a No Trigger Error with option to pass a body argument.
 * The use case for this over the custom Error class is to pass a body to provide error context.
 *
 * @param {String} message The error message to be returned.
 * @param {any} body Custom body to be returned when providing more error context.
 */

const noTriggerErrorRejection = (message = ERROR_MESSAGES.NO_TRIGGER, body) => {
	return baseRejectionWithBody(ERROR_CODES.NO_TRIGGER, message, body);
};

module.exports = {
	// error classes
	UserInputError,
	ConnectorError,
	ApiError,
	OAuthRefresh,
	NoTriggerError,
	// error functions with body
	userInputErrorRejection,
	connectorErrorRejection,
	apiErrorRejection,
	oauthErrorRejection,
	noTriggerErrorRejection,
};
