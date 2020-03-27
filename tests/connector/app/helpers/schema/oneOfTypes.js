const oneOfType = {
	title: 'OneOf',
	description: 'OneOf type.',
	oneOf: [
		{
			title: 'Option one',
			type: 'object',
			properties: {
				user_id: {
					title: 'Option one',
					type: 'string',
					lookup: {
						step_settings: {
							company_id: {
								type: 'integer',
								value: '{{{properties.company_id}}}',
							},
						},
					},
					required: true,
				},
			},
		},
		{
			title: 'Option two',
			type: 'object',
			properties: {
				account_id: {
					title: 'Option two',
					type: 'string',
					lookup: {},
					required: true,
				},
			},
		},
	],
};

exports.oneOfSchema = { one_of_type: oneOfType };
