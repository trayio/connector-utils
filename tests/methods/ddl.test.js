const ddl = require('../../lib/ddl');

const obj = {
	data: [
		{
			attributes: {
				name: 'Ryan',
			},
			id: 50,
		},
		{
			attributes: {
				name: 'Adam',
			},
			id: 51,
		}
	]
};

test('It should correctly get text & value based paths passed in', () => {
	expect(ddl.standard(obj.data, 'attributes.name', 'id')).toEqual({
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

test('It should correct get text & value based on mustached values', () => {
	expect(ddl.mustached(obj.data, '{{attributes.name}}', '{{id}}')).toEqual({
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