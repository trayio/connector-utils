const objectType = {
	type: 'object',
	title: 'Parent',
	properties: {
		name: {
			type: 'string',
		},
		child: {
			title: 'child',
			properties: {
				name: { type: 'string' },
			},
		},
	},
	additionalProperties: false,
};

exports.objectSchema = { object_type: objectType };
