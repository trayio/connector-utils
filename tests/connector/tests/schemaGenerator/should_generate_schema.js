/* eslint-disable no-console */
const { connectorSchema } = require('../../app/helpers/schema');

const MISSING_KEYS_MESSAGE =
	'There are missing schema keys that should be provided:';

let consoleErrorOutput = [];
let consoleTableOutput = [];
let consoleWarnOutput = [];

const originalConsoleError = console.error;
const originalConsoleTable = console.table;
const originalConsoleWarn = console.warn;

const mockedConsoleError = output => consoleErrorOutput.push(output);
const mockedConsoleTable = output => consoleTableOutput.push(output);
const mockedConsoleWarn = output => consoleWarnOutput.push(output);

exports.before = () => {
	consoleErrorOutput = [];
	consoleTableOutput = [];
	consoleWarnOutput = [];
	console.error = mockedConsoleError;
	console.table = mockedConsoleTable;
	console.warn = mockedConsoleWarn;
};
exports.expect = {
	output: connectorSchema,
};
exports.after = () => {
	console.error = originalConsoleError;
	console.table = originalConsoleTable;
	console.warn = originalConsoleWarn;
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
				key: 'schema_generator.one_of_type.oneOf.properties.user_id',
			},
			{
				description: 'missing',
				key: 'schema_generator.one_of_type.oneOf.properties.account_id',
			},
			{
				description: 'missing',
				key: 'schema_generator.string_type',
			},
		],
	]);
};
