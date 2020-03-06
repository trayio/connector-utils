exports.input = {
	arr: {},
	textPath: '{{id}}',
	valuePath: '{{name}}',
	mustached: true,
	options: {},
};

exports.expect = {
	error: {
		code: '#connector_error',
		message: 'The DDL operation requires an array to be passed.',
	},
};
