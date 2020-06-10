/* eslint-disable max-classes-per-file */

const ERROR_MESSAGES = {
	XML: 'The XML operation has encountered an issue.',
	MAP_KEYS: 'The mapKeys method has encountered an issue.',
	DDL: 'The DDL operation encountered an issue',
	LOOKUP: 'The lookup operation encountered an issue.',
	PAGINATION: 'The validatePagination operation encountered an issue.',
	REMOVE_AUTH: 'The removeAuthParams operation encountered an issue.',
};

class GenericInternalError extends Error {
	constructor(message, ...errorArgs) {
		super(message, ...errorArgs);

		// Maintains proper stack trace for where the error was thrown
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}

		this.name = this.constructor.name;
	}
}

class XMLError extends GenericInternalError {
	constructor(message = ERROR_MESSAGES.XML, ...errorArgs) {
		super(message, ...errorArgs);
	}
}

class DeepMapKeysError extends GenericInternalError {
	constructor(message = ERROR_MESSAGES.MAP_KEYS, ...errorArgs) {
		super(message, ...errorArgs);
	}
}

class LookupError extends GenericInternalError {
	constructor(message = ERROR_MESSAGES.DDL, ...errorArgs) {
		super(message, ...errorArgs);
	}
}

class PaginationError extends GenericInternalError {
	constructor(message = ERROR_MESSAGES.PAGINATION, ...errorArgs) {
		super(message, ...errorArgs);
	}
}

class RemoveAuthError extends GenericInternalError {
	constructor(message = ERROR_MESSAGES.REMOVE_AUTH, ...errorArgs) {
		super(message, ...errorArgs);
	}
}

module.exports = {
	XMLError,
	DeepMapKeysError,
	LookupError,
	PaginationError,
	RemoveAuthError,
};
