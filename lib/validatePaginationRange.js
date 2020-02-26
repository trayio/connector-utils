const _ = require('lodash');
const { PaginationError } = require('./internal/errors');
const { UserInputError } = require('./errors');

const RANGE_THRESHOLD = 1;

const validateIntegerArguments = (value, minRange, maxRange) => {
	const checkPositiveInt = int => int < 0;
	if (
		checkPositiveInt(value) ||
		checkPositiveInt(minRange) ||
		checkPositiveInt(maxRange)
	) {
		throw new PaginationError(
			'Arguments must not be a negative value (less than 0).',
		);
	}
};

/**
 * Helper for validating user pagination input for a given range.
 *
 * @param {Integer|String} value The value specified by user input.
 * @param {Object} validation Values relating specifically to the validation requirements.
 * @param {Integer|String} validation.minRange The minimum range specified by the API.
 * @param {Integer|String} validation.maxRange The maximum range specified by the API.
 * @param {String} validation.inputName The name of the input the range is associated with.
 * @example
 *
 * validatePaginationRange(50, { minRange: 1, maxRange: 100, inputName: 'page size' })
 * // no error thrown as pagination is within range
 *
 * validatePaginationRange(101, { minRange: 1, maxRange: 100, inputName: 'page size' })
 * // will throw a UserInputError as the pageSize is outside the range
 * // Error message returned: 'The page size must be between 1 - 100.'
 */

const validatePaginationRange = (value, { minRange, maxRange, inputName }) => {
	validateIntegerArguments(value, minRange, maxRange);
	if (!_.inRange(value, minRange, maxRange + RANGE_THRESHOLD)) {
		throw new UserInputError(
			`The ${inputName} must be between ${minRange} - ${maxRange}.`,
		);
	}
};

module.exports = validatePaginationRange;
