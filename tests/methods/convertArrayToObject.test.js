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
const customFields2 = [
	{
		field_name: 'some key',
		field_value: 'some value',
	},
	{
		field_name: 'helloWorld',
		field_value: 'hello world',
	},
	{
		field_name: 'foo_bar',
		field_value: 'foo bar',
	},
];
const noValueInput = [...customFields1, { key: 'hello' }];

const expectedOutput1 = {
	key1: 'value1',
	key2: 'value2',
	foo: 'bar',
};
const camelCaseOutput = {
	someKey: 'some value',
	helloWorld: 'hello world',
	fooBar: 'foo bar',
};
const snakeCaseOutput = {
	some_key: 'some value',
	hello_world: 'hello world',
	foo_bar: 'foo bar',
};
const emptyStringValueOutput = { ...expectedOutput1, hello: '' };

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
	it('Should create keys in camelCase', () => {
		expect(
			convertCustomFieldsArrToObj({
				customFields: customFields2,
				key: 'field_name',
				value: 'field_value',
			}),
		).toEqual(camelCaseOutput);
	});
	it('Should create keys in snakeCase', () => {
		expect(
			convertCustomFieldsArrToObj({
				customFields: customFields2,
				key: 'field_name',
				value: 'field_value',
				keyCase: 'snake',
			}),
		).toEqual(snakeCaseOutput);
	});
	it('Should add empty string values to non provided values', () => {
		expect(
			convertCustomFieldsArrToObj({
				customFields: noValueInput,
				key: 'key',
				value: 'value',
			}),
		).toEqual(emptyStringValueOutput);
	});
	it('Should accept key and value as string only', () => {
		expect(() =>
			convertCustomFieldsArrToObj({
				customFields: customFields1,
				key: {},
				value: 'value',
			}),
		).toThrow("Type of 'key' or 'value' must be a string");
		expect(() =>
			convertCustomFieldsArrToObj({
				customFields: customFields1,
				key: 'key',
				value: {},
			}),
		).toThrow("Type of 'key' or 'value' must be a string");
	});
	it('should throw error if all arguments are not supplied', () => {
		expect(() =>
			convertCustomFieldsArrToObj({ customFields: [], key: 'someKey' }),
		).toThrow(
			"One of 'customFields', 'key' or 'value' has not been supplied. Please include all arguments.",
		);
		expect(() =>
			convertCustomFieldsArrToObj({
				customFields: [],
				key: '',
				value: '',
			}),
		).toThrow(
			"One of 'customFields', 'key' or 'value' has not been supplied. Please include all arguments.",
		);
	});
});
