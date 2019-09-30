const camelCaseKeys = require('./camelCaseKeys');
const removeEmptyObjects = require('./removeEmptyObjects');
const lookup = require('./lookup');
const xmlFormatter = require('./xmlFormatter');
const ddl = require('./ddl');

const Falafel_utils = () => {
	return {
		camelCaseKeys,
		removeEmptyObjects,
		lookup,
		ddl,
		xmlFormatter,
	};
};

module.exports = Falafel_utils;
