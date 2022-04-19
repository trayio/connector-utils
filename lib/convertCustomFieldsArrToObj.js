const _ = require('lodash');
const { UserInputError } = require('./errors');

const validateArguments = ({ customFields, key, value }) => {
	if (!customFields || !key || !value) {
		throw new UserInputError(
			"One of 'customFields', 'key' or 'value' has not been supplied. Please include all arguments.",
		);
	}
	if (!Array.isArray(customFields)) {
		throw new UserInputError(
			"The 'customFields' argument has to be an array.",
		);
	}
	if (typeof key !== 'string' || typeof value !== 'string') {
		throw new UserInputError("Type of 'key' or 'value' must be a string");
	}
	return undefined;
};

/**
 * Helper to convert array into an object of key and values
 * @param {Array} customFields Array of objects demonstrates key value pairs
 * @param {String} key The name of the key e.g. field_name
 * @param {String} value The value of the key e.g. field_value
 * @param {String} keyCase Key case formatter. Options: 'camel', 'snake'
 * @returns {Object}
 */
const convertCustomFieldsArrToObj = ({
	customFields,
	key,
	value,
	keyCase = 'camel',
}) => {
	validateArguments({ customFields, key, value });
	const result = {};
	customFields.forEach((field) => {
		if (field[key]) {
			switch (keyCase) {
				case 'camel':
					// API might accept empty string as a valid value
					result[_.camelCase(field[key])] = field[value] || '';
					break;
				case 'snake':
					result[_.snakeCase(field[key])] = field[value] || '';
					break;
				default:
					result[field[key]] = field[value] || '';
					break;
			}
		}
	});
	return result;
};

module.exports = convertCustomFieldsArrToObj;
