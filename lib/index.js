const deepMapKeys = require('./deepMapKeys');
const removeEmptyObjects = require('./removeEmptyObjects');
const lookup = require('./lookup');
// const xmlFormatter = require('./xmlFormatter');
const { mustachedDDL, standardDDL } = require('./ddl');
const {
	UserInputError,
	ConnectorError,
	ApiError,
	OAuthRefresh,
	NoTriggerError,
	userInputErrorRejection,
	connectorErrorRejection,
	apiErrorRejection,
	oauthErrorRejection,
	noTriggerErrorRejection,
} = require('./errors');

module.exports = {
	error: {
		// error classes
		UserInputError,
		ConnectorError,
		ApiError,
		OAuthRefresh,
		NoTriggerError,
		// error function with body
		userInputErrorRejection,
		connectorErrorRejection,
		apiErrorRejection,
		oauthErrorRejection,
		noTriggerErrorRejection,
	},
	deepMap: {
		deepMapKeys,
		removeEmptyObjects,
	},
	schema: {
		lookup,
		mustachedDDL,
		standardDDL,
	},
	// Commenting for initial release pending functionality to add paths to treatAsArray
	// xml: {
	// 	xmlFormatter,
	// },
};
