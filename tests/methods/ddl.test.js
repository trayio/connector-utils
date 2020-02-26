const { mustachedDDL, DDL } = require('../../lib/index');
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
		{
			attributes: {
				last_name: 'Burley',
			},
			id: 51,
		},
	],
};

describe('Tests covering the DDL DDL method', () => {
	test('It should correctly get text & value based paths passed in', () => {
		expect(DDL(obj.data, 'attributes.first_name', 'id')).toEqual({
			result: [
				{
					text: 'Ryan',
					value: 50,
				},
				{
					text: 'Adam',
					value: 51,
				},
				{
					text: '51',
					value: 51,
				},
			],
		});
	});

	describe('Given NODE_ENV is development', () => {
		beforeAll(() => {
			process.env.NODE_ENV = 'development';
		});
		afterAll(() => {
			process.env.NODE_ENV = 'test';
		});

		test('It should throw an error if the value path does not exist', () => {
			expect(() =>
				DDL(obj.data, 'attributes.first_name', 'some_path.id'),
			).toThrow(
				new DDLError(
					"Path Not Found: Path at 'some_path.id' could not be found in the object.",
				),
			);
		});

		test('It should throw an error if the object passed is not an array', () => {
			expect(() =>
				DDL(
					{ data: 'someData' },
					'attributes.first_name',
					'some_path.id',
				),
			).toThrow(
				new DDLError(
					'The DDL operation requires an array to be passed.',
				),
			);
		});
	});

	test('If the value path does not exist should return empty DDL', () => {
		expect(DDL(obj.data, 'attributes.first_name', 'some_path.id')).toEqual({
			result: [],
		});
	});

	test('If the object passed is not an array should return empty DDL', () => {
		expect(
			DDL({ data: 'someData' }, 'attributes.first_name', 'some_path.id'),
		).toEqual({ result: [] });
	});
});

describe('Tests covering the mustached DDL method', () => {
	test('It should correctly get text & value based on mustached values', () => {
		expect(
			mustachedDDL(obj.data, 'Name: {{attributes.first_name}}', '{{id}}'),
		).toEqual({
			result: [
				{
					text: 'Name: Ryan',
					value: '50',
				},
				{
					text: 'Name: Adam',
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

	test('It should filter values out if the text path does not exist', () => {
		expect(
			mustachedDDL(obj.data, '{{some_path.first_name}}', '{{id}}').result
				.length,
		).toEqual(2);
	});

	test('If the value path is specified as an int and does not exist should return empty DDL', () => {
		expect(
			mustachedDDL(
				obj.data,
				'{{attributes.first_name}}',
				'{{some_path.id}}',
				true,
			),
		).toEqual({ result: [] });
	});

	test('If the object passed is not an array should return empty DDL', () => {
		expect(
			mustachedDDL(
				{ data: 'someData' },
				'{{attributes.first_name}}',
				'{{some_path.id}}',
			),
		).toEqual({ result: [] });
	});

	describe('Given NODE_ENV is development', () => {
		beforeAll(() => {
			process.env.NODE_ENV = 'development';
		});
		afterAll(() => {
			process.env.NODE_ENV = 'test';
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
				new DDLError(
					"Path Not Found: Path at '{{some_path.id}}' could not be found in the object.",
				),
			);
		});

		test('It should throw an error if the object passed is not an array', () => {
			expect(() =>
				mustachedDDL(
					{ data: 'someData' },
					'{{attributes.first_name}}',
					'{{some_path.id}}',
				),
			).toThrow(
				new DDLError(
					'The DDL operation requires an array to be passed.',
				),
			);
		});
	});
});
