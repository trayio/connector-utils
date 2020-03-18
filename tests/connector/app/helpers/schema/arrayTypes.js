const arrayType = {
	type: 'array',
	items: {
		type: 'object',
		title: 'Parent',
		description: 'Array type.',
		properties: {
			name: {
				type: 'string',
			},
			child: {
				type: 'object',
				title: 'child',
				properties: {
					name: { type: 'string' },
				},
			},
		},
	},
	additionalItems: true,
};

exports.arraySchema = { array_type: arrayType };
