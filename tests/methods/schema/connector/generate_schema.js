/* eslint-disable no-console */
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

let operationSchema;

describe('Schema generator connector operation', () => {
	beforeAll(() => {
		consoleErrorOutput = [];
		consoleTableOutput = [];
		consoleWarnOutput = [];

		console.error = mockedConsoleError;
		console.table = mockedConsoleTable;
		console.warn = mockedConsoleWarn;

		// require after mocking console otherwise issues will not be logged to mock
		// eslint-disable-next-line global-require
		operationSchema = require('../../../connector/app/connectors/sut/schema_generator/schema')
			.input;
	});

	afterAll(() => {
		console.error = originalConsoleError;
		console.table = originalConsoleTable;
		console.warn = originalConsoleWarn;
	});

	test('it should generate the operation schema', () => {
		expect(operationSchema).toEqual({
			array_type: {
				additionalItems: true,
				items: {
					description: 'Array type.',
					properties: {
						child: {
							properties: { name: { type: 'string' } },
							title: 'child',
							type: 'object',
						},
						name: { type: 'string' },
					},
					title: 'Parent',
					type: 'object',
				},
				type: 'array',
			},
			boolean_type: { type: 'boolean' },
			date_type: { date_mask: 'X', format: 'datetime' },
			integer_type: { type: 'integer' },
			missing_description: { type: 'integer' },
			missing_type: { description: 'The type is missing' },
			number_type: { default: 5, type: 'number' },
			object_type: {
				additionalProperties: false,
				properties: {
					child: {
						properties: { name: { type: 'string' } },
						title: 'child',
					},
					name: { type: 'string' },
				},
				title: 'Parent',
				type: 'object',
			},
			one_of_type: {
				description: 'OneOf type.',
				oneOf: [
					{
						properties: {
							user_id: {
								lookup: {
									step_settings: {
										company_id: {
											type: 'integer',
											value:
												'{{{properties.company_id}}}',
										},
									},
								},
								required: true,
								title: 'Option one',
								type: 'string',
							},
						},
						title: 'Option one',
						type: 'object',
					},
					{
						properties: {
							account_id: {
								lookup: {},
								required: true,
								title: 'Option two',
								type: 'string',
							},
						},
						title: 'Option two',
						type: 'object',
					},
				],
				title: 'OneOf',
			},
			string_type: { required: true, type: 'string' },
		});
	});

	test('it should log issues to the console', () => {
		expect(consoleErrorOutput).toEqual([MISSING_KEYS_MESSAGE]);
		expect(consoleWarnOutput).toEqual([]);
		expect(consoleTableOutput).toEqual([
			[
				{
					description: 'missing',
					key: 'schema_generator.array_type',
				},
				{
					description: 'missing',
					key: 'schema_generator.array_type.items.properties.name',
				},
				{
					description: 'missing',
					key: 'schema_generator.array_type.items.properties.child',
				},
				{
					description: 'missing',
					key:
						'schema_generator.array_type.items.properties.child.properties.name',
				},
				{
					description: 'missing',
					key: 'schema_generator.boolean_type',
				},
				{
					key: 'schema_generator.date_type',
					type: 'missing',
				},
				{
					description: 'missing',
					key: 'schema_generator.date_type',
				},
				{
					description: 'missing',
					key: 'schema_generator.integer_type',
				},
				{
					description: 'missing',
					key: 'schema_generator.missing_description',
				},
				{
					key: 'schema_generator.missing_type',
					type: 'missing',
				},
				{
					description: 'missing',
					key: 'schema_generator.number_type',
				},
				{
					description: 'missing',
					key: 'schema_generator.object_type',
				},
				{
					description: 'missing',
					key: 'schema_generator.object_type.properties.name',
				},
				{
					key: 'schema_generator.object_type.properties.child',
					type: 'missing',
				},
				{
					description: 'missing',
					key: 'schema_generator.object_type.properties.child',
				},
				{
					description: 'missing',
					key:
						'schema_generator.object_type.properties.child.properties.name',
				},
				{
					description: 'missing',
					key:
						'schema_generator.one_of_type.oneOf.properties.user_id',
				},
				{
					description: 'missing',
					key:
						'schema_generator.one_of_type.oneOf.properties.account_id',
				},
				{
					description: 'missing',
					key: 'schema_generator.string_type',
				},
			],
		]);
	});
});
