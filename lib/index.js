const camelCaseKeys = require('./camelCaseKeys');
const removeEmptyObjects = require('./removeEmptyObjects');
const lookup = require('./lookup');
const xmlFormatter = require('./xmlFormatter');
const ddl = require('./ddl');
const { UserInputError, ConnectorError } = require('./errors');

const Connector_utils = () => {
	return {
		error: {
			UserInputError,
			ConnectorError,
		},
		deepMap: {
			camelCaseKeys,
			removeEmptyObjects,
		},
		schema: {
			lookup,
			ddl,
		},
		xml: {
			xmlFormatter,
		},
	};
};

module.exports = Connector_utils;
