const { mustachedDDL, standardDDL } = require('../../lib/index').schema;
const { DDLError } = require('../../lib/internal/errors');

const obj = {
	data: [
		{
			attributes: {
				first_name: 'Ryan',
				last_name: 'Barker',
			},
			id: 50,
		},
		{
			attributes: {
				first_name: 'Adam',
				last_name: 'Barker',
			},
			id: 51,
		},
	],
};

describe('Tests covering the standardDDL DDL method', () => {
	test('It should correctly get text & value based paths passed in', () => {
		expect(standardDDL(obj.data, 'attributes.first_name', 'id')).toEqual({
			result: [
				{
					text: 'Ryan',
					value: 50,
				},
				{
					text: 'Adam',
					value: 51,
				},
			],
		});
	});

	test('It should throw an error if the text path does not exist', () => {
		expect(() =>
			standardDDL(obj.data, 'some_path.first_name', 'id'),
		).toThrow(
			"Path Not Found: Path at 'some_path.first_name' could not be found in the object.",
		);
	});

	test('It should throw an error if the value path does not exist', () => {
		expect(() =>
			standardDDL(obj.data, 'attributes.first_name', 'some_path.id'),
		).toThrow(
			"Path Not Found: Path at 'some_path.id' could not be found in the object.",
		);
	});

	test('It should throw an error if the object passed is not an array', () => {
		expect(() =>
			mustachedDDL(
				{ data: 'someData' },
				'attributes.first_name',
				'some_path.id',
			),
		).toThrow('The DDL operation requires an array to be passed.');
	});
});

describe('Tests covering the mustached DDL method', () => {
	test('It should correctly get text & value based on mustached values', () => {
		expect(
			mustachedDDL(obj.data, '{{attributes.first_name}}', '{{id}}'),
		).toEqual({
			result: [
				{
					text: 'Ryan',
					value: '50',
				},
				{
					text: 'Adam',
					value: '51',
				},
			],
		});
	});

	test('It should correctly get IDs as integer if set to true', () => {
		expect(
			mustachedDDL(
				obj.data,
				'{{attributes.first_name}} {{attributes.last_name}}',
				'{{id}}',
				true,
			),
		).toEqual({
			result: [
				{
					text: 'Ryan Barker',
					value: 50,
				},
				{
					text: 'Adam Barker',
					value: 51,
				},
			],
		});
	});

	test('It should throw an error if the text path does not exist', () => {
		expect(() =>
			mustachedDDL(obj.data, '{{some_path.first_name}}', '{{id}}'),
		).toThrow(DDLError);
	});

	test('It should throw an error if the value path is not specified as an int and does not exist', () => {
		expect(() =>
			mustachedDDL(
				obj.data,
				'{{attributes.first_name}}',
				'{{some_path.id}}',
			),
		).toThrow(
			"Path Not Found: Path at '{{some_path.id}}' could not be found in the object.",
		);
	});

	test('It should throw an error if the value path is specified as an int and does not exist', () => {
		expect(() =>
			mustachedDDL(
				obj.data,
				'{{attributes.first_name}}',
				'{{some_path.id}}',
				true,
			),
		).toThrow(
			"Path Not Found: Path at '{{some_path.id}}' could not be found in the object.",
		);
	});

	test('It should throw an error if the object passed is not an array', () => {
		expect(() =>
			mustachedDDL(
				{ data: 'someData' },
				'{{attributes.first_name}}',
				'{{some_path.id}}',
			),
		).toThrow('The DDL operation requires an array to be passed.');
	});
});
