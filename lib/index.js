const camelCaseKeys = require('./deepMapKeys');
const removeEmptyObjects = require('./removeEmptyObjects');
const lookup = require('./lookup');
// const xmlFormatter = require('./xmlFormatter');
const ddl = require('./ddl');
const {
	UserInputError,
	ConnectorError,
	ApiError,
	OAuthRefresh,
	NoTriggerError,
} = require('./errors');

module.exports = {
	error: {
		UserInputError,
		ConnectorError,
		ApiError,
		OAuthRefresh,
		NoTriggerError,
	},
	deepMap: {
		camelCaseKeys,
		removeEmptyObjects,
	},
	schema: {
		lookup,
		ddl,
	},
	// Commenting for initial release pending functionality to add paths to treatAsArray
	// xml: {
	// 	xmlFormatter,
	// },
};
