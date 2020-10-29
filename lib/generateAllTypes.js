const { UserInputError } = require('./errors');

/**
 * Helper for generating all available JSON schema types.
 *
 * @param {String} [exclude=''] Types to be excluded separated by comma
 * @return {Array} Array of string.
 */

const generateAllTypes = ({ exclude = '' }) => {
	if (typeof exclude !== 'string') {
		throw new UserInputError(
			'The type of "exclude" argument must be string.',
		);
	}
	let types = ['string', 'number', 'object', 'array', 'boolean', 'null'];
	const excludedTypesArr = exclude.split(',').map((type) => type.trim());
	types = types.filter((type) => !excludedTypesArr.includes(type));

	return types;
};

module.exports = generateAllTypes;
