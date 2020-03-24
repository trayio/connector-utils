const mustache = require('mustache');
const _ = require('lodash');
const { ConnectorError } = require('./errors');

// Mustaching will set integer values to string
// setting `integer` to true, and passing a path we get integer output

const setErrorMessage = path =>
	`Path Not Found: Path at '${path}' could not be found in the object.`;

const validateArray = arr => {
	if (!Array.isArray(arr)) {
		throw new ConnectorError(
			'The DDL operation requires an array to be passed.',
		);
	}
};
const validateValue = (value, template, item) => {
    if(parseInt(value, 10) === 0) return
	if (!value) {
		throw new ConnectorError(setErrorMessage(template), item);
	}
};

const wrapper = (arr, text, value, options, func) => {
	validateArray(arr);
	return func(arr, text, value, options);
};

const ddl = (arr, textPath, valuePath) => {
	return {
		result: arr.map(item => {
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
	arr,
	textTemplate,
	valueTemplate,
	{ isInteger = false },
) => {
	return {
		result: _.uniqBy(
			arr.map(item => {
				let value = mustache.render(valueTemplate, item);
				validateValue(value, valueTemplate, item);
				const text = mustache.render(textTemplate, item);

				if (isInteger) {
					value = parseInt(value, 10);
					if (_.isNaN(value)) {
						throw new ConnectorError(
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
 * If there does not exist a path, the whole result will not return.
 *
 * @param {Object} arr An array of objects with keys to iterate over and format.
 * @param {String} text The path for the required text value.
 * @param {String} value The path for the required value, value.
 * @param {Boolean} isInteger Flag for whether or not the value field needs to an integer rather than a string.
 */

const mustachedDDL = (arr, text, value, options = {}) =>
	wrapper(arr, text, value, options, mustacheDDL);

/**
 * Takes value paths as explicit strings and returns correct DDL outputs.
 * If a text value does not exist, the DDL falls back to using the 'value' path.
 *
 * @param {Object} arr An array of objects with keys to iterate over and format.
 * @param {String} textPath The path for the required text value.
 * @param {String} valuePath The path fot the required value, value.
 * @param {String} options Options to provide to the DDL
 */
const DDL = (arr, textPath, valuePath, options = {}) =>
	wrapper(arr, textPath, valuePath, options, ddl);

module.exports = {
	mustachedDDL,
	DDL,
};
