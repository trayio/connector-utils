const { generateInputSchema } = require('../../lib/index');

const MISSING_KEYS_MESSAGE =
	'There are missing schema keys that should be provided:';

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

const integerType = {
	type: 'integer',
};

const missingDescription = {
	type: 'integer',
};

const missingType = {
	description: 'The type is missing',
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
	integerType,
	missingDescription,
	missingType,
	numberType,
	objectType,
	oneOfType,
	stringType,
};

// eslint-disable-next-line no-console
const originalConsoleError = console.error;
// eslint-disable-next-line no-console
const originalConsoleTable = console.table;
// eslint-disable-next-line no-console
const originalConsoleWarn = console.warn;

let consoleErrorOutput = [];
let consoleTableOutput = [];
let consoleWarnOutput = [];

const mockedConsoleError = output => consoleErrorOutput.push(output);
const mockedConsoleTable = output => consoleTableOutput.push(output);
const mockedConsoleWarn = output => consoleWarnOutput.push(output);

describe('Generate input schemas', () => {
	beforeEach(() => {
		consoleErrorOutput = [];
		consoleTableOutput = [];
		consoleWarnOutput = [];
		// eslint-disable-next-line no-console
		console.error = mockedConsoleError;
		// eslint-disable-next-line no-console
		console.table = mockedConsoleTable;
		// eslint-disable-next-line no-console
		console.warn = mockedConsoleWarn;
	});

	afterEach(() => {
		// eslint-disable-next-line no-console
		console.error = originalConsoleError;
		// eslint-disable-next-line no-console
		console.table = originalConsoleTable;
		// eslint-disable-next-line no-console
		console.warn = originalConsoleWarn;
	});

	const fullSchemaInput = {
		arrayType: {},
		booleanType: {},
		dateType: {},
		integerType: {},
		missingDescription: {},
		missingType: {},
		numberType: {},
		objectType: {},
		oneOfType: {},
		stringType: {},
	};

	let schema;

	describe('Copy schema elements', () => {
		beforeEach(() => {
			schema = generateInputSchema({
				schema: fullSchema,
				keys: fullSchemaInput,
				operation: 'testOp',
			});
		});

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
		test('It should log if the requested key is not found.', () => {
			generateInputSchema({
				schema: { arrayType },
				keys: {
					thisKeyDoesNotExist: {},
				},
				operation: 'testArrayType',
			});
			expect(consoleErrorOutput).toEqual([MISSING_KEYS_MESSAGE]);
			expect(consoleTableOutput).toEqual([
				[
					{
						key: 'testArrayType.thisKeyDoesNotExist',
						type: 'missing',
					},
					{
						description: 'missing',
						key: 'testArrayType.thisKeyDoesNotExist',
					},
				],
			]);
		});

		test('It should log if the type is missing.', () => {
			generateInputSchema({
				schema: fullSchema,
				keys: { missingType: {} },
				operation: 'testMissingType',
			});
			expect(consoleErrorOutput).toEqual([MISSING_KEYS_MESSAGE]);
			expect(consoleTableOutput).toEqual([
				[
					{
						key: 'testMissingType.missingType',
						type: 'missing',
					},
				],
			]);
		});

		test('It should log if the description is missing.', () => {
			generateInputSchema({
				schema: fullSchema,
				keys: { missingDescription: {} },
				operation: 'testMissingDescription',
			});
			expect(consoleWarnOutput).toEqual([MISSING_KEYS_MESSAGE]);
			expect(consoleTableOutput).toEqual([
				[
					{
						key: 'testMissingDescription.missingDescription',
						description: 'missing',
					},
				],
			]);
		});

		test('It should log if the override type is missing.', () => {
			generateInputSchema({
				schema: fullSchema,
				keys: {
					override: {
						description: 'Override type is missing.',
					},
				},
				operation: 'testMissingOverrideType',
			});
			expect(consoleErrorOutput).toEqual([MISSING_KEYS_MESSAGE]);
			expect(consoleTableOutput).toEqual([
				[
					{
						type: 'missing',
						key: 'testMissingOverrideType.override',
					},
				],
			]);
		});

		test('It should log if the override description is missing.', () => {
			generateInputSchema({
				schema: fullSchema,
				keys: { override: { type: 'string' } },
				operation: 'testMissingOverrideDescription',
			});
			expect(consoleWarnOutput).toEqual([MISSING_KEYS_MESSAGE]);
			expect(consoleTableOutput).toEqual([
				[
					{
						description: 'missing',
						key: 'testMissingOverrideDescription.override',
					},
				],
			]);
		});

		test('It should not log if the override type and description are present.', () => {
			generateInputSchema({
				schema: fullSchema,
				keys: {
					override: { type: 'string', description: 'Description.' },
				},
				operation: 'testFullOverride',
			});
			expect(consoleWarnOutput).toEqual([]);
			expect(consoleTableOutput).toEqual([]);
		});

		test('It should log all issue in full schema.', () => {
			generateInputSchema({
				schema: fullSchema,
				keys: fullSchemaInput,
				operation: 'testFullSchema',
			});
			expect(consoleErrorOutput).toEqual([MISSING_KEYS_MESSAGE]);
			expect(consoleTableOutput).toEqual([
				[
					{
						description: 'missing',
						key: 'testFullSchema.arrayType',
					},
					{
						description: 'missing',
						key: 'testFullSchema.arrayType.items.properties.name',
					},
					{
						description: 'missing',
						key: 'testFullSchema.arrayType.items.properties.child',
					},
					{
						description: 'missing',
						key:
							'testFullSchema.arrayType.items.properties.child.properties.name',
					},
					{
						description: 'missing',
						key: 'testFullSchema.booleanType',
					},
					{
						key: 'testFullSchema.dateType',
						type: 'missing',
					},
					{
						description: 'missing',
						key: 'testFullSchema.dateType',
					},
					{
						description: 'missing',
						key: 'testFullSchema.integerType',
					},
					{
						description: 'missing',
						key: 'testFullSchema.missingDescription',
					},
					{
						key: 'testFullSchema.missingType',
						type: 'missing',
					},
					{
						description: 'missing',
						key: 'testFullSchema.numberType',
					},
					{
						description: 'missing',
						key: 'testFullSchema.objectType',
					},
					{
						description: 'missing',
						key: 'testFullSchema.objectType.properties.name',
					},
					{
						key: 'testFullSchema.objectType.properties.child',
						type: 'missing',
					},
					{
						description: 'missing',
						key: 'testFullSchema.objectType.properties.child',
					},
					{
						description: 'missing',
						key:
							'testFullSchema.objectType.properties.child.properties.name',
					},
					{
						description: 'missing',
						key:
							'testFullSchema.oneOfType.oneOf.properties.user_id',
					},
					{
						description: 'missing',
						key:
							'testFullSchema.oneOfType.oneOf.properties.account_id',
					},
					{
						description: 'missing',
						key: 'testFullSchema.stringType',
					},
				],
			]);
		});
	});

	describe('Generate schemas', () => {
		test('It should generate schema from overrides only.', () => {
			const generatedSchema = generateInputSchema({
				schema: fullSchema,
				keys: {
					override: { type: 'string', description: 'Description.' },
				},
				operation: 'testFullOverride',
			});
			expect(generatedSchema).toEqual({
				override: {
					description: 'Description.',
					type: 'string',
				},
			});
		});

		test('It should generate schema from requested key.', () => {
			const generatedSchema = generateInputSchema({
				schema: fullSchema,
				keys: {
					objectType: {},
				},
				operation: 'testRequestKey',
			});
			expect(generatedSchema).toEqual({
				objectType: {
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
				},
			});
		});

		test('It should generate schema from requested key with overrides.', () => {
			const generatedSchema = generateInputSchema({
				schema: fullSchema,
				keys: {
					dateType: {
						type: 'string',
						description: 'Date time override.',
					},
				},
				operation: 'testRequestKeyWithOverrides',
			});
			expect(generatedSchema).toEqual({
				dateType: {
					date_mask: 'X',
					description: 'Date time override.',
					format: 'datetime',
					type: 'string',
				},
			});
		});
	});
});
