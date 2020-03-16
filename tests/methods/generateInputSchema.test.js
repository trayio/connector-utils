const { generateInputSchema } = require('../../lib/index');

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
	type: 'string',
	format: 'datetime',
	date_mask: 'X',
};

const integerType = {
	type: 'integer',
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
			type: 'object',
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
					lookup: {},
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
	integerType,
	numberType,
	objectType,
	oneOfType,
	stringType,
};

describe('Generate input schemas', () => {
	const fullSchemaInput = {
		arrayType: {},
		booleanType: {},
		dateType: {},
		integerType: {},
		numberType: {},
		objectType: {},
		oneOfType: {},
		stringType: {},
	};

	const schema = generateInputSchema(fullSchema, fullSchemaInput);

	describe('It should make a copy of the schema elements', () => {
		test('It should not modify the schema elements', () => {
			expect(schema).not.toBe(fullSchema);
			expect(schema).toEqual(fullSchema);
		});

		test.each([
			['array'],
			['boolean'],
			['date'],
			['integer'],
			['number'],
			['object'],
			['oneOf'],
			['string'],
		])('It should copy %s types', key => {
			const type = `${key}Type`;
			expect(schema[type]).not.toBe(fullSchema[type]);
			expect(schema[type]).toEqual(fullSchema[type]);
		});

		test('It should deep copy child objects', () => {
			expect(schema.arrayType.items.properties.child).not.toBe(
				fullSchema.arrayType.items.properties.child,
			);
			expect(schema.arrayType.items.properties.child).not.toBe(
				arrayType.items.properties.child,
			);
			expect(schema.arrayType.items.properties.child).toEqual(
				fullSchema.arrayType.items.properties.child,
			);
			expect(schema.arrayType.items.properties.child).toEqual(
				arrayType.items.properties.child,
			);
		});
	});

	describe('Validation', () => {
		test('It should error if the requested key is not found.', () => {
			expect(() => {
				generateInputSchema(fullSchema, {
					thisKeyDoesNotExistInTheFullSchema: {},
				});
			}).toThrow();
		});
	});
});
