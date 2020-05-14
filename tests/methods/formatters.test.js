const { UserInputError } = require('../../lib/errors');
const {
	formatArray,
	formatArrayToDelimitedList,
} = require('../../lib/index').formatters;

describe('Array should be correctly formatted as a delimited list', () => {
	describe('formatArray', () => {
		it('should return a comma delimited list, given an array of strings', () => {
			const arrayOfStrings = [1, 2, 'third', 'fourth'];
			expect(formatArray(arrayOfStrings)).toEqual('1,2,third,fourth');
		});

		it('should return "undefined" if argument is undefined', () => {
			expect(formatArray(undefined)).toBeUndefined();
		});

		it('should throw error if input exists but is not an array', () => {
			const notArray = 'not an array';

			expect(() => formatArray(notArray)).toThrow(
				new UserInputError(
					"Expected an array but instead received input of type 'string'.",
				),
			);
		});
	});

	describe('formatArrayToDelimitedList', () => {
		it('should return a comma delimited list, given an array of strings', () => {
			const arrayOfStrings = [1, 2, 'third', 'fourth'];
			expect(
				formatArrayToDelimitedList({ arrayToFormat: arrayOfStrings }),
			).toEqual('1,2,third,fourth');
		});

		it('should return a list delimited by the specified delimiter "//", given an array of strings', () => {
			const arrayOfStrings = [1, 2, 'third', 'fourth'];
			expect(
				formatArrayToDelimitedList({
					arrayToFormat: arrayOfStrings,
					delimiter: '//',
				}),
			).toEqual('1//2//third//fourth');
		});

		it('should return "undefined" if value of "arrayToFormat" is undefined', () => {
			expect(
				formatArrayToDelimitedList({ arrayToFormat: undefined }),
			).toBeUndefined();
		});

		it('should throw error if input exists but is not an array', () => {
			const notArray = {};

			expect(() =>
				formatArrayToDelimitedList({ arrayToFormat: notArray }),
			).toThrow(
				new UserInputError(
					"Expected an array but instead received input of type 'object'.",
				),
			);
		});
	});
});
