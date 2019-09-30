const ddl = require('../../lib/ddl');

const obj = {
	data: [
		{
			attributes: {
				first_name: 'Ryan',
				last_name: 'Barker'
			},
			id: 50,
		},
		{
			attributes: {
				first_name: 'Adam',
				last_name: 'Barker'
			},
			id: 51,
		}
	]
};

test('It should correctly get text & value based paths passed in', () => {
	expect(ddl.standard(obj.data, 'attributes.first_name', 'id')).toEqual({
		result: [
			{
				text: 'Ryan',
				value: 50,
			},
			{
				text: 'Adam',
				value: 51,
			},
		]
	});
});

test('It should correctly get text & value based on mustached values', () => {
	expect(ddl.mustached(obj.data, '{{attributes.first_name}}', '{{id}}')).toEqual({
		result: [
			{
				text: 'Ryan',
				value: '50',
			},
			{
				text: 'Adam',
				value: '51',
			},
		]
	});
});

test('It should correctly get IDs as integer if set to true', () => {
	expect(ddl.mustached(obj.data, '{{attributes.first_name}} {{attributes.last_name}}', 'id', true)).toEqual({
		result: [
			{
				text: 'Ryan Barker',
				value: 50,
			},
			{
				text: 'Adam Barker',
				value: 51,
			},
		]
	});
});