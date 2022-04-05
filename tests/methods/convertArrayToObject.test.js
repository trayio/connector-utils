const { convertArrayToObject } = require('../../lib');

const inputArray = [
	{
		key: 'key1',
		value: 'value1',
	},
	{
		key: 'key2',
		value: 'value2',
	},
	{
		key: 'foo',
		value: 'bar',
	},
];

const expectedOutput = {
	key1: 'value1',
	key2: 'value2',
};

describe('convertArrayToObject', () => {
	it('Should convert array into keys and values correctly', () => {
		expect(convertArrayToObject(inputArray)).toEqual(expectedOutput);
	});
	it('should throw error if excluded type is not string', () => {
		expect(() => convertArrayToObject({ arrayOfObjects: [] })).toThrow(
			'The type of "exclude" argument must be string.',
		);
	});
	it('should throw error 1', () => {
		expect(() =>
			convertArrayToObject({ arrayOfObjects: [], key: 'someKey' }),
		).toThrow(
			"One of 'arrayOfObjects', 'key' or 'value' has not been supplied. Please include all arguments.",
		);
	});
	it('should throw error 2', () => {
		expect(() => convertArrayToObject({ arrayOfObjects: [] })).toThrow(
			"One of 'arrayOfObjects', 'key' or 'value' has not been supplied. Please include all arguments.",
		);
	});
});
