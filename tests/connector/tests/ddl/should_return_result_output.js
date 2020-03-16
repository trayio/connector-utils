exports.input = {
	arr: [
		{ id: 'foo', name: 'bar' },
		{ id: 'fizz', name: 'buzz' },
	],
	textPath: 'id',
	valuePath: 'name',
	options: {},
};

exports.expect = {
	output: {
		result: [
			{ text: 'foo', value: 'bar' },
			{ text: 'fizz', value: 'buzz' },
		],
	},
};
