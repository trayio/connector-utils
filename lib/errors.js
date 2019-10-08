const errorMessages = {
	userInput: 'Invalid input.',
	connector: 'An issue has occurred with the connector.',
	api: 'An issue has occurred with the API.',
	oAuth: 'oAuth token invalid.',
};
const errorCodes = {
	userInput: '#user_input_error',
	connector: '#connector_error',
	api: '#api_error',
	oAuth: '#oauth_refresh',
};

/** Class representing the base error for all connector errors
 * @extends Error
 */
class GenericError extends Error {
	constructor(message, body) {
		super(message);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}

		this.name = this.constructor.name;
		this.body = body;
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
	 * @param  {...any} body Body allowing for custom body to be returned.
	 */
	constructor(message = errorMessages.userInput, body) {
		super(message, body);

		this.code = errorCodes.userInput;
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
	 * @param  {...any} body Body allowing for custom body to be returned.
	 */
	constructor(message = errorMessages.connector, body) {
		super(message, body);

		this.code = errorMessages.connector;
	}
}

/** Class representing a ConnectorError
 * @extends GenericError
 */
class ApiError extends GenericError {
	/**
	 * Custom error to throw for issues concerning the Connector.
	 *
	 * @param {String} message Custom error message to return.
	 * @param  {...any} body Body allowing for custom body to be returned.
	 */
	constructor(message = errorMessages.api, body) {
		super(message, body);

		this.code = errorCodes.api;
	}
}

/** Class representing a ConnectorError
 * @extends GenericError
 */
class oAuthRefresh extends GenericError {
	/**
	 * Custom error to throw for issues concerning the Connector.
	 *
	 * @param {String} message Custom error message to return.
	 * @param  {...any} body Body allowing for custom body to be returned.
	 */
	constructor(message = errorMessages.oAuth, body) {
		super(message, body);

		this.code = errorCodes.oAuth;
	}
}

module.exports = {
	UserInputError,
	ConnectorError,
	ApiError,
	oAuthRefresh,
};
