const mustache = require('mustache');
const _ = require('lodash');

// Mustaching will set integer values to string
// setting `integer` to true, and passing a path we get integer output

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
