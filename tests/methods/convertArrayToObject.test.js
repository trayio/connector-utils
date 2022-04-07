const { convertCustomFieldsArrToObj } = require('../../lib');

const customFields1 = [
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

const customFields2 = [...customFields1, { key: 'hello' }];

const expectedOutput1 = {
	key1: 'value1',
	key2: 'value2',
	foo: 'bar',
};
const expectedOutput2 = { ...expectedOutput1, hello: '' };

describe('convertCustomFieldsArrToObj', () => {
	it('Should convert array into keys and values correctly', () => {
		expect(
			convertCustomFieldsArrToObj({
				customFields: customFields1,
				key: 'key',
				value: 'value',
			}),
		).toEqual(expectedOutput1);
	});
	it('Should add empty string values', () => {
		expect(
			convertCustomFieldsArrToObj({
				customFields: customFields2,
				key: 'key',
				value: 'value',
			}),
		).toEqual(expectedOutput2);
	});
	// test case
	// test type of key and value

	// it('should throw error if excluded type is not string', () => {
	// 	expect(() =>
	// 		convertCustomFieldsArrToObj({ arrayOfObjects: [] }),
	// 	).toThrow('The type of "exclude" argument must be string.');
	// });
	// it('should throw error 1', () => {
	// 	expect(() =>
	// 		convertCustomFieldsArrToObj({ arrayOfObjects: [], key: 'someKey' }),
	// 	).toThrow(
	// 		"One of 'customFields', 'key' or 'value' has not been supplied. Please include all arguments.",
	// 	);
	// });
	// it('should throw error 2', () => {
	// 	expect(() =>
	// 		convertCustomFieldsArrToObj({ arrayOfObjects: [] }),
	// 	).toThrow(
	// 		"One of 'customFields', 'key' or 'value' has not been supplied. Please include all arguments.",
	// 	);
	// });
});
