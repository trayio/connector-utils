const defaultInputErrorMessage = 'Invalid input.';
const defaultConnectorErrorMessage =
	'An issue has occurred with the connector.';
/** Class representing a UserInputError
 * @extends Error
 */
class UserInputError extends Error {
	/**
	 * Custom error to throw for issues concerning User Input.
	 *
	 * @param {String} message Custom error message to return.
	 * @param {String} [code='#user_input_error'] A hard coded error code for this error.
	 * @param  {...any} params Params allowing for further error context.
	 */
	constructor(
		message = defaultInputErrorMessage,
		code = '#user_input_error',
		...params
	) {
		super(...params);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, UserInputError);
		}

		this.code = code;
		this.message = message;
	}
}

/** Class representing a ConnectorError
 * @extends Error
 */
class ConnectorError extends Error {
	/**
	 * Custom error to throw for issues concerning the Connector.
	 *
	 * @param {String} message Custom error message to return.
	 * @param {String} [code='#connector_error'] A hard coded error code for this error.
	 * @param  {...any} params Params allowing for further error context.
	 */
	constructor(
		message = defaultConnectorErrorMessage,
		code = '#connector_error',
		...params
	) {
		super(...params);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ConnectorError);
		}

		this.code = code;
		this.message = message;
	}
}

module.exports = {
	UserInputError,
	ConnectorError,
};
