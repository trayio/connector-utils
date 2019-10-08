const camelCaseKeys = require('./mapKeys');
const removeEmptyObjects = require('./removeEmptyObjects');
const lookup = require('./lookup');
const xmlFormatter = require('./xmlFormatter');
const ddl = require('./ddl');
const { UserInputError, ConnectorError } = require('./errors');

module.exports = {
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
