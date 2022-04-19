const { convertCustomFieldsArrToObj } = require('../../lib');

describe('convertCustomFieldsArrToObj', () => {
	describe('Basic behaviour', () => {
		const customFields = [
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
		it('Should convert array into keys and values correctly', () => {
			expect(
				convertCustomFieldsArrToObj({
					customFields,
					key: 'key',
					value: 'value',
				}),
			).toEqual({
				key1: 'value1',
				key2: 'value2',
				foo: 'bar',
			});
		});
		it('Should add empty string values to non provided values', () => {
			const noValueInput = [...customFields, { key: 'hello' }];
			expect(
				convertCustomFieldsArrToObj({
					customFields: noValueInput,
					key: 'key',
					value: 'value',
				}),
			).toEqual({
				key1: 'value1',
				key2: 'value2',
				foo: 'bar',
				hello: '',
			});
		});
	});
	describe('validation', () => {
		it('Should accept key and value as string only', () => {
			const customFields = [
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
			expect(() =>
				convertCustomFieldsArrToObj({
					customFields,
					key: {},
					value: 'value',
				}),
			).toThrow("Type of 'key' and 'value' must be a string");
			expect(() =>
				convertCustomFieldsArrToObj({
					customFields,
					key: 'key',
					value: {},
				}),
			).toThrow("Type of 'key' and 'value' must be a string");
		});
		it('Should accept customFields as an array only', () => {
			expect(() =>
				convertCustomFieldsArrToObj({
					customFields: { key: 'value' },
					key: 'key',
					value: 'value',
				}),
			).toThrow("Type of 'customFields' must be an array.");
		});
		it('should throw error if all arguments are not supplied', () => {
			expect(() =>
				convertCustomFieldsArrToObj({
					customFields: [],
					key: 'someKey',
				}),
			).toThrow(
				"One of 'customFields', 'key' or 'value' has not been supplied. Please include all arguments.",
			);
			expect(() =>
				convertCustomFieldsArrToObj({
					customFields: [],
					key: 'key',
					value: '',
				}),
			).toThrow(
				"One of 'customFields', 'key' or 'value' has not been supplied. Please include all arguments.",
			);
		});
	});
	describe('cases', () => {
		const customFields = [
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
		it('Should create keys in camelCase', () => {
			expect(
				convertCustomFieldsArrToObj({
					customFields,
					key: 'field_name',
					value: 'field_value',
				}),
			).toEqual({
				someKey: 'some value',
				helloWorld: 'hello world',
				fooBar: 'foo bar',
			});
		});
		it('Should create keys in snakeCase', () => {
			expect(
				convertCustomFieldsArrToObj({
					customFields,
					key: 'field_name',
					value: 'field_value',
					keyCase: 'snake',
				}),
			).toEqual({
				some_key: 'some value',
				hello_world: 'hello world',
				foo_bar: 'foo bar',
			});
		});
		it('Should create keys in custom case', () => {
			const customCaseFields = [
				{
					field_name: 'Some_Key',
					field_value: 'some value',
				},
				{
					field_name: 'helloWORLD',
					field_value: 'hello world',
				},
				{
					field_name: 'FOOBar',
					field_value: 'foo bar',
				},
			];
			expect(
				convertCustomFieldsArrToObj({
					customFields: customCaseFields,
					key: 'field_name',
					value: 'field_value',
					keyCase: 'custom',
				}),
			).toEqual({
				Some_Key: 'some value',
				helloWORLD: 'hello world',
				FOOBar: 'foo bar',
			});
		});
	});
});
