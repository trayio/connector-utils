const { UserInputError } = require('./errors');

/**
 * Helper to convert array into an object of key and values
 * @param {Array} arrayOfObjects
 * @param {String} key The name of the key e.g. field_name
 * @param {String} value The value of the key e.g. field_value
 * @returns {Object}
 */
const convertArrayToObject = ({ arrayOfObjects, key, value }) => {
	if (!arrayOfObjects || !key || !value) {
		throw new UserInputError(
			"One of 'arrayOfObjects', 'key' or 'value' has not been supplied. Please include all arguments.",
		);
	}
	if (!Array.isArray(arrayOfObjects)) {
		throw new UserInputError(
			"The 'arrayOfObjects' argument has to be an array.",
		);
	}
	return {};
};

module.exports = convertArrayToObject;
