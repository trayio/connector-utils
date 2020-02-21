const { validatePaginationRange } = require('../../');

const PAGE_SIZE = 50;
const MIN_PAGE_SIZE = 1;
const MAX_PAGE_SIZE = 100;
const INPUT_NAME = 'page size';

describe('Pagination should be correctly validated', () => {
	test('No error should be thrown if pageSize is within range.', () => {
		expect(
			validatePaginationRange(PAGE_SIZE, {
				minRange: MIN_PAGE_SIZE,
				maxRange: MAX_PAGE_SIZE,
				inputName: INPUT_NAME,
			}),
		).toBeUndefined();
	});
	test('Error should be thrown if the pageSize is larger than required range.', () => {
		const LARGE_PAGE_SIZE = 101;
		expect(() =>
			validatePaginationRange(LARGE_PAGE_SIZE, {
				minRange: MIN_PAGE_SIZE,
				maxRange: MAX_PAGE_SIZE,
				inputName: INPUT_NAME,
			}),
		).toThrow('The page size must be between 1 - 100.');
	});
	test('Error should be thrown if the pageSize is smaller than required range', () => {
		const SMALL_PAGE_SIZE = 0;
		expect(() =>
			validatePaginationRange(SMALL_PAGE_SIZE, {
				minRange: MIN_PAGE_SIZE,
				maxRange: MAX_PAGE_SIZE,
				inputName: INPUT_NAME,
			}),
		).toThrow('The page size must be between 1 - 100.');
	});
	test('Error should be thrown when pageSize is negative', () => {
		const NEGATIVE_PAGE_SIZE = -1;
		expect(() =>
			validatePaginationRange(NEGATIVE_PAGE_SIZE, {
				minRange: MIN_PAGE_SIZE,
				maxRange: MAX_PAGE_SIZE,
				inputName: INPUT_NAME,
			}),
		).toThrow('Arguments must not be a negative value (less than 0).');
	});
	test('Error should be thrown when minPageSize is negative', () => {
		const NEGATIVE_MIN_PAGE_SIZE = -1;
		expect(() =>
			validatePaginationRange(PAGE_SIZE, {
				minRange: NEGATIVE_MIN_PAGE_SIZE,
				maxRange: MAX_PAGE_SIZE,
				inputName: INPUT_NAME,
			}),
		).toThrow('Arguments must not be a negative value (less than 0).');
	});
	test('Error should be thrown when maxPageSize is negative', () => {
		const NEGATIVE_MAX_PAGE_SIZE = -1;
		expect(() =>
			validatePaginationRange(PAGE_SIZE, {
				minRange: MIN_PAGE_SIZE,
				maxRange: NEGATIVE_MAX_PAGE_SIZE,
				inputName: INPUT_NAME,
			}),
		).toThrow('Arguments must not be a negative value (less than 0).');
	});
	describe('Method should not discriminate against types (strings/ints)', () => {
		const STRING_PAGE_SIZE = '50';
		const STRING_MIN_PAGE_SIZE = '1';
		const STRING_MAX_PAGE_SIZE = '100';

		test('Should not return an error if pageSize is a string', () => {
			expect(
				validatePaginationRange(STRING_PAGE_SIZE, {
					minRange: MIN_PAGE_SIZE,
					maxRange: MAX_PAGE_SIZE,
					inputName: INPUT_NAME,
				}),
			).toBeUndefined();
		});
		test('Should not return an error if minPageSize is a string', () => {
			expect(
				validatePaginationRange(PAGE_SIZE, {
					minRange: STRING_MIN_PAGE_SIZE,
					maxRange: MAX_PAGE_SIZE,
					inputName: INPUT_NAME,
				}),
			).toBeUndefined();
		});
		test('Should not return an error if maxPageSize is a string', () => {
			expect(
				validatePaginationRange(PAGE_SIZE, {
					minRange: MIN_PAGE_SIZE,
					maxRange: STRING_MAX_PAGE_SIZE,
					inputName: INPUT_NAME,
				}),
			).toBeUndefined();
		});
		test('Should not return an error if all args are strings', () => {
			expect(
				validatePaginationRange(STRING_PAGE_SIZE, {
					minRange: STRING_MIN_PAGE_SIZE,
					maxRange: STRING_MAX_PAGE_SIZE,
					inputName: INPUT_NAME,
				}),
			).toBeUndefined();
		});
	});
});
