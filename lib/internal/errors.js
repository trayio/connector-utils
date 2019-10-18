const ERROR_MESSAGES = {
	XML: 'The XML operation has encountered an issue.',
	MAP_KEYS: 'The mapKeys method has encountered an issue.',
	DDL: 'The DDL operation encountered an issue',
	LOOKUP: 'The lookup operation encountered an issue.',
};

class GenericInternalError extends Error {
	constructor(message) {
		super(message);

		// Maintains proper stack trace for where the error was thrown
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}

		this.name = this.constructor.name;
	}
}

class XMLError extends GenericInternalError {
	constructor(message = ERROR_MESSAGES.XML) {
		super(message);
	}
}

class DeepMapKeysError extends GenericInternalError {
	constructor(message = ERROR_MESSAGES.MAP_KEYS) {
		super(message);
	}
}

class DDLError extends GenericInternalError {
	constructor(message = ERROR_MESSAGES.DDL) {
		super(message);
	}
}

class LookupError extends GenericInternalError {
	constructor(message = ERROR_MESSAGES.DDL) {
		super(message);
	}
}

module.exports = {
	XMLError,
	DeepMapKeysError,
	DDLError,
	LookupError,
};
