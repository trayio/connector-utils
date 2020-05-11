const { formatArrayToCommaDelimitedList } = require('../../lib/index');

describe('Array should be correctly formatted as a Comma Delimited List', () => {
	it('should return a comma delimited list, given an array of strings', () => {
		const arrayOfStrings = [1, 2, 'third', 'fourth'];
		expect(
			formatArrayToCommaDelimitedList({ arrayToFormat: arrayOfStrings }),
		).toEqual('1,2,third,fourth');
	});
});
