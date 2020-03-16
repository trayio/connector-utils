/* eslint-disable no-console */
const deepMapKeys = require('./deepMapKeys');
const removeEmptyObjects = require('./removeEmptyObjects');
const lookup = require('./lookup');
const validatePaginationRange = require('./validatePaginationRange');
const generateInputSchema = require('./generateInputSchema');
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
			// eslint-disable-next-line no-console
			console.warn(`deepMapKeys: ${deprecationWarning}`);
			return deepMapKeys(collection, iteratee);
		},
		removeEmptyObjects: collection => {
			// eslint-disable-next-line no-console
			console.warn(`removeEmptyObjects: ${deprecationWarning}`);
			return removeEmptyObjects(collection);
		},
	},
	schema: {
		lookup: (message, step_settings = {}) => {
			// eslint-disable-next-line no-console
			console.warn(`lookup: ${deprecationWarning}`);
			return lookup(message, step_settings);
		},
		mustachedDDL: (object, text, value, isInteger = false) => {
			// eslint-disable-next-line no-console
			console.warn(`mustachedDDL: ${deprecationWarning}`);
			return mustachedDDL(object, text, value, isInteger);
		},
		DDL: (object, textPath, valuePath) => {
			// eslint-disable-next-line no-console
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
	// Commenting for initial release pending functionality to add paths to treatAsArray
	// xml: {
	// 	xmlFormatter,
	// },
};
