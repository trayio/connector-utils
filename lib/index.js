const camelCaseKeys = require('./camelCaseKeys');
const removeEmptyObjects = require('./removeEmptyObjects');
const lookup = require('./lookup');
const xmlFormatter = require('./xmlFormatter');
const ddl = require('./ddl');

const Connector_utils = () => {
	return {
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
