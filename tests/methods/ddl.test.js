const { mustachedDDL, DDL } = require('../../lib/index');
const { ConnectorError } = require('../../lib/errors');

const obj = {
	data: [
		{
			attributes: {
				first_name: 'Hux',
				last_name: 'Millard',
			},
			id: 0,
		},
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
			id: 52,
		},
	],
};

describe('Tests covering the DDL DDL method', () => {
	test('It should correctly get text & value based paths passed in', () => {
		expect(DDL(obj.data, 'attributes.first_name', 'id')).toEqual({
			result: [
				{
					text: 'Hux',
					value: 0,
				},
				{
					text: 'Ryan',
					value: 50,
				},
				{
					text: 'Adam',
					value: 51,
				},
				{
					text: '52',
					value: 52,
				},
			],
		});
	});
	test('If the value path does not exist should throw connector error', () => {
		expect(() => {
			DDL(obj.data, 'attributes.first_name', 'some_path.id');
		}).toThrow(
			new ConnectorError(
				"Path Not Found: Path at 'some_path.id' could not be found in the object.",
			),
		);
	});

	test('If the object passed is not an array should throw a connector error', () => {
		expect(() => {
			DDL({ data: 'someData' }, 'attributes.first_name', 'some_path.id');
		}).toThrow(
			new ConnectorError(
				'The DDL operation requires an array to be passed.',
			),
		);
	});
});

describe('Tests covering the mustached DDL method', () => {
	test('It should correctly get text & value based on mustached values', () => {
		expect(
			mustachedDDL(obj.data, 'Name: {{attributes.first_name}}', '{{id}}'),
		).toEqual({
			result: [
				{
					text: 'Name: Hux',
					value: '0',
				},
				{
					text: 'Name: Ryan',
					value: '50',
				},
				{
					text: 'Name: Adam',
					value: '51',
				},
				{
					text: 'Name: ',
					value: '52',
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
				{ isInteger: true },
			),
		).toEqual({
			result: [
				{
					text: 'Hux Millard',
					value: 0,
				},
				{
					text: 'Ryan Barker',
					value: 50,
				},
				{
					text: 'Adam Barker',
					value: 51,
				},
				{
					text: ' Burley',
					value: 52,
				},
			],
		});
	});

	test('If the value path is specified as an int and does not exist should throw', () => {
		expect(() =>
			mustachedDDL(
				obj.data,
				'{{attributes.first_name}}',
				'{{some_path.id}}',
				true,
			),
		).toThrow(
			new ConnectorError(
				"Path Not Found: Path at '{{some_path.id}}' could not be found in the object.",
			),
		);
	});

	test('If the object passed is not an array should return empty DDL', () => {
		expect(() =>
			mustachedDDL(
				{ data: 'someData' },
				'{{attributes.first_name}}',
				'{{some_path.id}}',
			),
		).toThrow(
			new ConnectorError(
				'The DDL operation requires an array to be passed.',
			),
		);
	});
});
