const _ = require('lodash');
const mapKeys = require('../../lib/mapKeys');
const number = 10;
const input = {
	top_level: {
		key_one: 'value',
		key_two: 'value',
		key_three: number,
	},
	nested_keys: {
		top: {
			nested_key_one: 'value',
			nested_key_two: number,
		},
	},
	object_array: {
		top: [
			{
				nested_key_one: 'value',
				nested_key_two: number,
			},
			{
				nested_key_one: 'value',
				nested_key_two: number,
			},
		],
	},
	nested_object_array: {
		top: [
			{
				nested_key_one: [
					{
						deep_key_one: number,
						deep_key_two: 'value',
					},
					{
						deep_key_one: number,
						deep_key_two: 'value',
					},
				],
				nested_key_two: number,
			},
			{
				nested_key_one: 'value',
				nested_key_two: number,
			},
		],
	},
};

describe('Object keys should be correctly camelCased', () => {
	test('It should just return the parameter if no object is passed', () => {
		expect(mapKeys('Some value')).toEqual('Some value');
	});

	test('It camelCases top level keys', () => {
		expect(mapKeys(input.top_level, _.camelCase)).toEqual({
			keyOne: 'value',
			keyTwo: 'value',
			keyThree: number,
		});
	});

	test('It camelCases nested keys', () => {
		expect(mapKeys(input.nested_keys, _.camelCase)).toEqual({
			top: {
				nestedKeyOne: 'value',
				nestedKeyTwo: number,
			},
		});
	});

	test('It camelCases keys in array of objects', () => {
		expect(mapKeys(input.object_array, _.camelCase)).toEqual({
			top: [
				{
					nestedKeyOne: 'value',
					nestedKeyTwo: number,
				},
				{
					nestedKeyOne: 'value',
					nestedKeyTwo: number,
				},
			],
		});
	});

	test('It camelCases keys in nested array of objects', () => {
		expect(mapKeys(input.nested_object_array, _.camelCase)).toEqual({
			top: [
				{
					nestedKeyOne: [
						{
							deepKeyOne: number,
							deepKeyTwo: 'value',
						},
						{
							deepKeyOne: number,
							deepKeyTwo: 'value',
						},
					],
					nestedKeyTwo: number,
				},
				{
					nestedKeyOne: 'value',
					nestedKeyTwo: number,
				},
			],
		});
	});

	test('It handles all cases', () => {
		expect(mapKeys(input, _.camelCase)).toEqual({
			topLevel: {
				keyOne: 'value',
				keyTwo: 'value',
				keyThree: number,
			},
			nestedKeys: {
				top: {
					nestedKeyOne: 'value',
					nestedKeyTwo: number,
				},
			},
			objectArray: {
				top: [
					{
						nestedKeyOne: 'value',
						nestedKeyTwo: number,
					},
					{
						nestedKeyOne: 'value',
						nestedKeyTwo: number,
					},
				],
			},
			nestedObjectArray: {
				top: [
					{
						nestedKeyOne: [
							{
								deepKeyOne: number,
								deepKeyTwo: 'value',
							},
							{
								deepKeyOne: number,
								deepKeyTwo: 'value',
							},
						],
						nestedKeyTwo: number,
					},
					{
						nestedKeyOne: 'value',
						nestedKeyTwo: number,
					},
				],
			},
		});
	});
});
