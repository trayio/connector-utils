const mustache = require('mustache');
const _ = require('lodash');
const { DDLError } = require('./internal/errors');

// Mustaching will set integer values to string
// setting `integer` to true, and passing a path we get integer output

const setErrorMessage = path =>
	`Path Not Found: Path at '${path}' could not be found in the output object.`;

const validateMustachedPaths = (item, text, value, integer) => {
	if (!mustache.render(text, item)) {
		throw new DDLError(setErrorMessage(text));
	} else if (integer) {
		if (!_.get(item, value)) {
			throw new DDLError(setErrorMessage(value));
		}
	} else if (!integer) {
		if (!mustache.render(value, item)) {
			throw new DDLError(setErrorMessage(value));
		}
	}
};

const validateStandardPaths = (item, textPath, valuePath) => {
	if (!_.get(item, textPath)) {
		throw new DDLError(setErrorMessage(textPath));
	}
	if (!_.get(item, valuePath)) {
		throw new DDLError(setErrorMessage(valuePath));
	}
};

/**
 * Takes value paths as mustached values and returns correct DDL outputs.
 * A custom flag is in place to allow for keeping integer types for the value key
 * if required, as mustaching will convert an integer to string.
 *
 * @param {Object} object The collection with keys to iterate over and format.
 * @param {String} text The path for the required text value.
 * @param {String} value The path fot the required value, value.
 * @param {Boolean} integer Flag for whether or not the value field needs to an integer rather than a string.
 */

const mustached = (object, text, value, integer = false) => {
	return {
		result: _.uniqBy(
			object.map(item => {
				validateMustachedPaths(item, text, value, integer);
				return {
					text: mustache.render(text, item),
					value: integer
						? _.get(item, value)
						: mustache.render(value, item),
				};
			}),
			'value',
		),
	};
};

/**
 * Takes value paths as explicit strings and returns correct DDL outputs.
 *
 * @param {Object} object The collection with keys to iterate over and format.
 * @param {String} textPath The path for the required text value.
 * @param {String} valuePath The path fot the required value, value.
 */

const standard = (object, textPath, valuePath) => {
	return {
		result: object.map(item => {
			validateStandardPaths(item, textPath, valuePath);
			return {
				text: _.get(item, textPath),
				value: _.get(item, valuePath),
			};
		}),
	};
};

module.exports = {
	mustached,
	standard,
};
