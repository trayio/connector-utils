/* eslint-disable no-console */
const { generateInputSchema } = require('../../../lib/index');

const { arrayType, fullSchema } = require('./schema');

const MISSING_KEYS_MESSAGE =
	'There are missing schema keys that should be provided:';

const originalConsoleError = console.error;
const originalConsoleTable = console.table;
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
		console.error = mockedConsoleError;
		console.table = mockedConsoleTable;
		console.warn = mockedConsoleWarn;
	});

	afterEach(() => {
		console.error = originalConsoleError;
		console.table = originalConsoleTable;
		console.warn = originalConsoleWarn;
	});

	const fullSchemaInput = {
		arrayType: {},
		booleanType: {},
		dateType: {},
		enumStringType: {},
		enumValueType: {},
		integerType: {},
		missingDescription: {},
		missingType: {},
		numberType: {},
		objectType: {},
		oneOfType: {},
		stringType: {},
	};

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
					override: {
						type: 'string',
						description: 'Description.',
					},
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
});
