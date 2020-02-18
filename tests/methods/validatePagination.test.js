const { validatePagination } = require('../../lib/index');

const PAGE_SIZE = 50;
const MIN_PAGE_SIZE = 1;
const MAX_PAGE_SIZE = 100;

describe('Pagination should be correctly validated', () => {
	test('No error should be thrown if pageSize is within range.', () => {
		expect(
			validatePagination(PAGE_SIZE, MIN_PAGE_SIZE, MAX_PAGE_SIZE),
		).toBe(undefined);
	});
	test('Error should be thrown if the pageSize is larger than required range.', () => {
		const LARGE_PAGE_SIZE = 101;
		expect(() =>
			validatePagination(LARGE_PAGE_SIZE, MIN_PAGE_SIZE, MAX_PAGE_SIZE),
		).toThrow('The Page size must be between 1 - 100.');
	});
	test('Error should be thrown if the pageSize is smaller than required range', () => {
		const SMALL_PAGE_SIZE = 0;
		expect(() =>
			validatePagination(SMALL_PAGE_SIZE, MIN_PAGE_SIZE, MAX_PAGE_SIZE),
		).toThrow('The Page size must be between 1 - 100.');
	});
	test('Error should be thrown when pageSize is not an integer', () => {
		const STRING_PAGE_SIZE = '50';
		expect(() =>
			validatePagination(STRING_PAGE_SIZE, MIN_PAGE_SIZE, MAX_PAGE_SIZE),
		).toThrow('Arguments need to be integer types.');
	});
	test('Error should be thrown when minPageSize is not an integer', () => {
		const STRING_MIN_PAGE_SIZE = '1';
		expect(() =>
			validatePagination(PAGE_SIZE, STRING_MIN_PAGE_SIZE, MAX_PAGE_SIZE),
		).toThrow('Arguments need to be integer types.');
	});
	test('Error should be thrown when maxPageSize is not an integer', () => {
		const STRING_MAX_PAGE_SIZE = '100';
		expect(() =>
			validatePagination(PAGE_SIZE, MIN_PAGE_SIZE, STRING_MAX_PAGE_SIZE),
		).toThrow('Arguments need to be integer types.');
	});
	test('Error should be thrown when all arguments are not integers', () => {
		const STRING_PAGE_SIZE = '50';
		const STRING_MIN_PAGE_SIZE = '1';
		const STRING_MAX_PAGE_SIZE = '100';
		expect(() =>
			validatePagination(
				STRING_PAGE_SIZE,
				STRING_MIN_PAGE_SIZE,
				STRING_MAX_PAGE_SIZE,
			),
		).toThrow('Arguments need to be integer types.');
	});
});
