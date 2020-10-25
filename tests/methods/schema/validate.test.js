/* eslint-disable no-console */
const { generateInputSchema } = require('../../../lib/index');

const { arrayType, fullSchema } = require('./schema');

const INPUT_SCHEMA_PROBLEMS_MESSAGE =
	'There are problems with the generated input schema:';

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
		missingFullStop: {},
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
				operation: 'validateArrayType',
			});
			expect(consoleErrorOutput).toEqual([INPUT_SCHEMA_PROBLEMS_MESSAGE]);
			expect(consoleTableOutput).toEqual([
				[
					{
						key: 'validateArrayType.thisKeyDoesNotExist',
						type: 'missing',
					},
					{
						description: 'missing',
						key: 'validateArrayType.thisKeyDoesNotExist',
					},
				],
			]);
		});

		test('It should log if the type is missing.', () => {
			generateInputSchema({
				schema: fullSchema,
				keys: { missingType: {} },
				operation: 'validateMissingType',
			});
			expect(consoleErrorOutput).toEqual([INPUT_SCHEMA_PROBLEMS_MESSAGE]);
			expect(consoleTableOutput).toEqual([
				[
					{
						key: 'validateMissingType.missingType',
						type: 'missing',
					},
				],
			]);
		});

		test('It should log if the description is missing.', () => {
			generateInputSchema({
				schema: fullSchema,
				keys: { missingDescription: {} },
				operation: 'validateMissingDescription',
			});
			expect(consoleWarnOutput).toEqual([INPUT_SCHEMA_PROBLEMS_MESSAGE]);
			expect(consoleTableOutput).toEqual([
				[
					{
						key: 'validateMissingDescription.missingDescription',
						description: 'missing',
					},
				],
			]);
		});

		test('It should log if the description is missing a valid ending punctuation mark.', () => {
			generateInputSchema({
				schema: fullSchema,
				keys: { missingFullStop: {} },
				operation: 'validateMissingFullStop',
			});
			expect(consoleWarnOutput).toEqual([INPUT_SCHEMA_PROBLEMS_MESSAGE]);
			expect(consoleTableOutput).toEqual([
				[
					{
						key: 'validateMissingFullStop.missingFullStop',
						'ending punctuation': 'missing',
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
				operation: 'validateMissingOverrideType',
			});
			expect(consoleErrorOutput).toEqual([INPUT_SCHEMA_PROBLEMS_MESSAGE]);
			expect(consoleTableOutput).toEqual([
				[
					{
						type: 'missing',
						key: 'validateMissingOverrideType.override',
					},
				],
			]);
		});

		test('It should log if the override description is missing.', () => {
			generateInputSchema({
				schema: fullSchema,
				keys: { override: { type: 'string' } },
				operation: 'validateMissingOverrideDescription',
			});
			expect(consoleWarnOutput).toEqual([INPUT_SCHEMA_PROBLEMS_MESSAGE]);
			expect(consoleTableOutput).toEqual([
				[
					{
						description: 'missing',
						key: 'validateMissingOverrideDescription.override',
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
				operation: 'validateFullOverride',
			});
			expect(consoleWarnOutput).toEqual([]);
			expect(consoleTableOutput).toEqual([]);
		});

		test('It should log all issue in full schema.', () => {
			generateInputSchema({
				schema: fullSchema,
				keys: fullSchemaInput,
				operation: 'validateFullSchema',
			});
			expect(consoleErrorOutput).toEqual([INPUT_SCHEMA_PROBLEMS_MESSAGE]);
			expect(consoleTableOutput).toEqual([
				[
					{
						description: 'missing',
						key: 'validateFullSchema.arrayType',
					},
					{
						description: 'missing',
						key:
							'validateFullSchema.arrayType.items.properties.name',
					},
					{
						description: 'missing',
						key:
							'validateFullSchema.arrayType.items.properties.child',
					},
					{
						description: 'missing',
						key:
							'validateFullSchema.arrayType.items.properties.child.properties.name',
					},
					{
						description: 'missing',
						key: 'validateFullSchema.booleanType',
					},
					{
						key: 'validateFullSchema.dateType',
						type: 'missing',
					},
					{
						description: 'missing',
						key: 'validateFullSchema.dateType',
					},
					{
						description: 'missing',
						key: 'validateFullSchema.integerType',
					},
					{
						description: 'missing',
						key: 'validateFullSchema.missingDescription',
					},
					{
						key: 'validateFullSchema.missingFullStop',
						'ending punctuation': 'missing',
					},
					{
						key: 'validateFullSchema.missingType',
						type: 'missing',
					},
					{
						description: 'missing',
						key: 'validateFullSchema.numberType',
					},
					{
						description: 'missing',
						key: 'validateFullSchema.objectType',
					},
					{
						description: 'missing',
						key: 'validateFullSchema.objectType.properties.name',
					},
					{
						key: 'validateFullSchema.objectType.properties.child',
						type: 'missing',
					},
					{
						description: 'missing',
						key: 'validateFullSchema.objectType.properties.child',
					},
					{
						description: 'missing',
						key:
							'validateFullSchema.objectType.properties.child.properties.name',
					},
					{
						description: 'missing',
						key:
							'validateFullSchema.oneOfType.oneOf.properties.user_id',
					},
					{
						description: 'missing',
						key:
							'validateFullSchema.oneOfType.oneOf.properties.account_id',
					},
					{
						description: 'missing',
						key: 'validateFullSchema.stringType',
					},
				],
			]);
		});
	});
});
