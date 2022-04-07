const { UserInputError } = require('./errors');

/**
 * Helper to convert array into an object of key and values
 * @param {Array} customFields
 * @param {String} key The name of the key e.g. field_name
 * @param {String} value The value of the key e.g. field_value
 * @returns {Object}
 */
const convertCustomFieldsArrToObj = ({ customFields, key, value }) => {
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
	const result = {};
	customFields.forEach((field) => {
		if (field[key]) {
			// API might accept empty string as a valid value
			result[field[key]] = field[value] || '';
		}
	});
	return result;
};

module.exports = convertCustomFieldsArrToObj;
