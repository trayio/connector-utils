const {
	formatArray,
	formatArrayToDelimitedList,
} = require('../../lib/index').formatters;

describe('Array should be correctly formatted as a Delimited List', () => {
	describe('formatArray', () => {
		it('should return a comma delimited list, given an array of strings', () => {
			const arrayOfStrings = [1, 2, 'third', 'fourth'];
			expect(formatArray(arrayOfStrings)).toEqual('1,2,third,fourth');
		});

		it('should return "undefined" if argument is not an array', () => {
			expect(formatArray('Not an array')).toBeUndefined();
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

		it('should return "undefined" if value of "arrayToFormat" is not an array', () => {
			expect(
				formatArrayToDelimitedList({ arrayToFormat: 'Not an array' }),
			).toBeUndefined();
		});
	});
});
