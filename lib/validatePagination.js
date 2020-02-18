const _ = require('lodash');
const { PaginationError } = require('../lib/internal/errors');
const { UserInputError } = require('../lib/errors');
const RANGE_THRESHOLD = 1;

const validateIntegerArguments = (pageSize, minPageSize, maxPageSize) => {
	const checkInt = arg => Number.isInteger(arg);
	const checkPositiveInt = int => int < 0;
	if (
		!checkInt(pageSize) ||
		!checkInt(minPageSize) ||
		!checkInt(maxPageSize)
	) {
		throw new PaginationError('Arguments need to be integer types.');
	}

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
 * @param {Integer} pageSize The page size specified by user input.
 * @param {Integer} minPageSize The minimum page size specified by the API.
 * @param {Integer} maxPageSize The maximum page size specified by the API.
 * @example
 *
 * validatePagination(50, 1, 100)
 * // no error thrown as pagination is within range
 *
 * validatePagination(101, 1, 100)
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
