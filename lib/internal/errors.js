const errorMessages = {
	xml: 'The XML operation has encountered an issue.',
	mapKeys: 'The mapKeys method has encountered an issue.',
	ddl: 'The DDL operation encountered an issue',
};

class GenericInternalError extends Error {
	constructor(message) {
		super(message);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}

		this.name = this.constructor.name;
	}
}

class XMLError extends GenericInternalError {
	constructor(message = errorMessages.xml) {
		super(message);
	}
}

class MapKeysError extends GenericInternalError {
	constructor(message = errorMessages.xml) {
		super(message);
	}
}

class DDLError extends GenericInternalError {
	constructor(message = errorMessages.ddl) {
		super(message);
	}
}

module.exports = {
	XMLError,
	MapKeysError,
	DDLError,
};
