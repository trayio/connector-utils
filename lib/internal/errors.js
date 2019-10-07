const xmlErrorMessage = 'The nested structure of the output is too large.';

class XMLError extends Error {
	/**
	 * Internal error for treating XML methods.
	 *
	 * @param {String} message Value of the message to be thrown.
	 * @param  {...any} params Additional context for the error.
	 */
	constructor(message = xmlErrorMessage, ...params) {
		super(...params);
		Error.captureStackTrace(this, XMLError);
		this.message = message;
	}
}

module.exports = {
	XMLError,
};
