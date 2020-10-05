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

const booleanType = {
	type: 'boolean',
};

const dateType = {
	format: 'datetime',
	date_mask: 'X',
};

const enumStringType = {
	type: 'string',
	description: 'Enum string type.',
	enum: ['One', 'Two', 'Three'],
};

const enumValueType = {
	type: 'integer',
	description: 'Enum value type.',
	enum: [
		{ text: 'One', value: 1 },
		{ text: 'Two', value: 2 },
		{ text: 'Three', value: 3 },
	],
};

const integerType = {
	type: 'integer',
};

const missingDescription = {
	type: 'integer',
};

const missingFullStop = {
	type: 'string',
	description: 'When in Rome, kill me',
};

const missingType = {
	description: 'The type is missing.',
};

const numberType = {
	type: 'number',
	default: 5,
};

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

const stringType = {
	type: 'string',
	required: true,
};

const fullSchema = {
	arrayType,
	booleanType,
	dateType,
	enumStringType,
	enumValueType,
	integerType,
	missingDescription,
	missingFullStop,
	missingType,
	numberType,
	objectType,
	oneOfType,
	stringType,
};

module.exports = {
	arrayType,
	booleanType,
	dateType,
	enumStringType,
	enumValueType,
	fullSchema,
	integerType,
	missingDescription,
	missingFullStop,
	missingType,
	numberType,
	objectType,
	oneOfType,
	stringType,
};
