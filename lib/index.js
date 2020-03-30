/* eslint-disable no-console */
const deepMapKeys = require('./deepMapKeys');
const removeEmptyObjects = require('./removeEmptyObjects');
const lookup = require('./lookup');
const validatePaginationRange = require('./validatePaginationRange');
const generateInputSchema = require('./generateInputSchema');
const formatArrayToCommaDelimitedList = require('./formatArrayToCommaDelimitedList');
// const xmlFormatter = require('./xmlFormatter');
const { mustachedDDL, DDL } = require('./ddl');
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

const deprecationWarning =
	'Nested use of this method is deprecated. Please import from top level of the library.';

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
		deepMapKeys: (collection, iteratee) => {
			console.warn(`deepMapKeys: ${deprecationWarning}`);
			return deepMapKeys(collection, iteratee);
		},
		removeEmptyObjects: collection => {
			console.warn(`removeEmptyObjects: ${deprecationWarning}`);
			return removeEmptyObjects(collection);
		},
	},
	schema: {
		lookup: (message, step_settings = {}) => {
			console.warn(`lookup: ${deprecationWarning}`);
			return lookup(message, step_settings);
		},
		mustachedDDL: (object, text, value, isInteger = false) => {
			console.warn(`mustachedDDL: ${deprecationWarning}`);
			return mustachedDDL(object, text, value, isInteger);
		},
		DDL: (object, textPath, valuePath) => {
			console.warn(`DDL: ${deprecationWarning}`);
			return DDL(object, textPath, valuePath);
		},
	},
	deepMapKeys,
	removeEmptyObjects,
	lookup,
	mustachedDDL,
	DDL,
	validatePaginationRange,
	generateInputSchema,
	formatArrayToCommaDelimitedList,
	// Commenting for initial release pending functionality to add paths to treatAsArray
	// xml: {
	// 	xmlFormatter,
	// },
};
