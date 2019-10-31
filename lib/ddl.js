const mustache = require('mustache');
const _ = require('lodash');
const { DDLError } = require('./internal/errors');

// Mustaching will set integer values to string
// setting `integer` to true, and passing a path we get integer output

const setErrorMessage = path =>
	`Path Not Found: Path at '${path}' could not be found in the object.`;

const validateArray = object => {
	if (!Array.isArray(object)) {
		throw new DDLError('The DDL operation requires an array to be passed.');
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
 * @param {Boolean} isInteger Flag for whether or not the value field needs to an integer rather than a string.
 */

const mustachedDDL = (object, text, value, isInteger = false) => {
	validateArray(object);
	return {
		result: _.uniqBy(
			object.map(item => {
				const mustachedText = mustache.render(text, item);
				let mustachedValue = mustache.render(value, item);

				if (!mustachedText) {
					throw new DDLError(setErrorMessage(text), item);
				}

				if (!mustachedValue) {
					throw new DDLError(setErrorMessage(value), item);
				}
				if (isInteger) {
					mustachedValue = parseInt(mustachedValue);
					if (isNaN(mustachedValue)) {
						throw new DDLError(`Value at ${value} cannot be NaN.`);
					}
				}

				return {
					text: mustachedText,
					value: mustachedValue,
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

const standardDDL = (object, textPath, valuePath) => {
	validateArray(object);
	return {
		result: object.map(item => {
			const retrievedText = _.get(item, textPath);
			const retrievedValue = _.get(item, valuePath);

			if (!retrievedText) {
				throw new DDLError(setErrorMessage(textPath), item);
			}

			if (!retrievedValue) {
				throw new DDLError(setErrorMessage(valuePath), item);
			}

			return {
				text: retrievedText,
				value: retrievedValue,
			};
		}),
	};
};

module.exports = {
	mustachedDDL,
	standardDDL,
};
