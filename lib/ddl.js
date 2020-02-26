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
const validateValue = (value, template, item) => {
	if (!value) {
		throw new DDLError(setErrorMessage(template), item);
	}
};

const wrapper = (object, text, value, options, func) => {
	try {
		validateArray(object);
		return func(object, text, value, options);
	} catch (err) {
		// We don't want to expose internal errors to users so simply fail silently.
		if (process.env.NODE_ENV === 'development') {
			throw err;
		} else {
			return {
				result: [],
			};
		}
	}
};

const ddl = (object, textPath, valuePath) => {
	return {
		result: object.map(item => {
			const value = _.get(item, valuePath);
			validateValue(value, valuePath, item);
			const text = _.get(item, textPath) || value.toString();
			return {
				text,
				value,
			};
		}),
	};
};

const mustacheDDL = (
	object,
	textTemplate,
	valueTemplate,
	{ isInteger = false },
) => {
	return {
		result: _.uniqBy(
			object.map(item => {
				let value = mustache.render(valueTemplate, item);
				validateValue(value, valueTemplate, item);
				const text =
					mustache.render(textTemplate, item) || value.toString;

				if (isInteger) {
					value = parseInt(value, 10);
					if (_.isNaN(value)) {
						throw new DDLError(
							`Value at ${valueTemplate} cannot be NaN.`,
						);
					}
				}

				return {
					text,
					value,
				};
			}),
			'value',
		),
	};
};
/**
 * Takes value paths as mustached values and returns correct DDL outputs.
 * A custom flag is in place to allow for keeping integer types for the value key
 * if required, as mustaching will convert an integer to string.
 *
 * @param {Object} object The collection with keys to iterate over and format.
 * @param {String} text The path for the required text value.
 * @param {String} value The path for the required value, value.
 * @param {Boolean} isInteger Flag for whether or not the value field needs to an integer rather than a string.
 */

const mustachedDDL = (object, text, value, options = {}) =>
	wrapper(object, text, value, options, mustacheDDL);

/**
 * Takes value paths as explicit strings and returns correct DDL outputs.
 *
 * @param {Object} object The collection with keys to iterate over and format.
 * @param {String} textPath The path for the required text value.
 * @param {String} valuePath The path fot the required value, value.
 * @param {String} options Options to provide to the DDL
 */
const DDL = (object, textPath, valuePath, options = {}) =>
	wrapper(object, textPath, valuePath, options, ddl);

module.exports = {
	mustachedDDL,
	DDL,
};
