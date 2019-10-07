const xmlErrorMessage = 'The nested structure of the output is too large.';

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
	XMLError,
};
