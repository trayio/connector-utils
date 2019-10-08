const { mustached, standard } = require('../../lib/ddl');

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
describe('Tests covering the standard DDL method', () => {
	test('It should correctly get text & value based paths passed in', () => {
		expect(standard(obj.data, 'attributes.first_name', 'id')).toEqual({
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
		expect(() => standard(obj.data, 'some_path.first_name', 'id')).toThrow(
			"Path Not Found: Path at 'some_path.first_name' could not be found in the output object.",
		);
	});

	test('It should throw an error if the value path does not exist', () => {
		expect(() =>
			standard(obj.data, 'attributes.first_name', 'some_path.id'),
		).toThrow(
			"Path Not Found: Path at 'some_path.id' could not be found in the output object.",
		);
	});
});
describe('Tests covering the mustached DDL method', () => {
	test('It should correctly get text & value based on mustached values', () => {
		expect(
			mustached(obj.data, '{{attributes.first_name}}', '{{id}}'),
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
			mustached(
				obj.data,
				'{{attributes.first_name}} {{attributes.last_name}}',
				'id',
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
			mustached(obj.data, '{{some_path.first_name}}', '{{id}}'),
		).toThrow(
			"Path Not Found: Path at '{{some_path.first_name}}' could not be found in the output object.",
		);
	});

	test('It should throw an error if the value path is not specified as an int and does not exist', () => {
		expect(() =>
			mustached(
				obj.data,
				'{{attributes.first_name}}',
				'{{some_path.id}}',
			),
		).toThrow(
			"Path Not Found: Path at '{{some_path.id}}' could not be found in the output object.",
		);
	});

	test('It should throw an error if the value path is specified as an int and does not exist', () => {
		expect(() =>
			mustached(
				obj.data,
				'{{attributes.first_name}}',
				'some_path.id',
				true,
			),
		).toThrow(
			"Path Not Found: Path at 'some_path.id' could not be found in the output object.",
		);
	});
});
