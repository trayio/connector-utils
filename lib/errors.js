const defaultInputErrorMessage = 'Invalid input.';
const defaultConnectorErrorMessage =
	'An issue has occurred with the connector.';
const xmlErrorMessage = 'The nested structure of the output is too large.';

class UserInputError extends Error {
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

class ConnectorError extends Error {
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

class XMLError extends Error {
	constructor(message = xmlErrorMessage, ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, XMLError);
		}
		this.message = message;
	}
}

module.exports = {
	UserInputError,
	ConnectorError,
	internal: {
		XMLError,
	},
};
