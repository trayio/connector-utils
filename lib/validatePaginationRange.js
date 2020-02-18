const _ = require('lodash');
const { PaginationError } = require('./internal/errors');
const { UserInputError } = require('./errors');
const RANGE_THRESHOLD = 1;

const validateIntegerArguments = (pageSize, minPageSize, maxPageSize) => {
	const checkPositiveInt = int => int < 0;
	if (
		checkPositiveInt(pageSize) ||
		checkPositiveInt(minPageSize) ||
		checkPositiveInt(maxPageSize)
	) {
		throw new PaginationError(
			'Arguments must not be a negative value (less than 0).',
		);
	}
};

/**
 * Helper for validating user pagination input for a given range.
 *
 * @param {Integer|String} pageSize The page size specified by user input.
 * @param {Integer|String} minPageSize The minimum page size specified by the API.
 * @param {Integer|String} maxPageSize The maximum page size specified by the API.
 * @example
 *
 * validatePaginationRange(50, 1, 100)
 * // no error thrown as pagination is within range
 *
 * validatePaginationRange(101, 1, 100)
 * // will throw a UserInputError as the pageSize is outside the range
 */

const validatePaginationRange = (pageSize, minPageSize, maxPageSize) => {
	validateIntegerArguments(pageSize, minPageSize, maxPageSize);
	if (!_.inRange(pageSize, minPageSize, maxPageSize + RANGE_THRESHOLD)) {
		throw new UserInputError(
			`The page size must be between ${minPageSize} - ${maxPageSize}.`,
		);
	}
};

module.exports = validatePaginationRange;
