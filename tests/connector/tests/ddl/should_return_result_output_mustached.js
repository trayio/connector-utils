exports.input = {
	arr: [
		{ id: 'foo', name: 'bar' },
		{ id: 'fizz', name: 'buzz' },
	],
	textPath: '{{id}}',
	valuePath: '{{name}}',
	options: {},
	mustache: true,
};

exports.expect = {
	output: {
		result: [
			{ text: 'foo', value: 'bar' },
			{ text: 'fizz', value: 'buzz' },
		],
	},
};