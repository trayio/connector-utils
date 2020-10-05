const { generateInputSchema } = require('../../../lib/index');
const { arrayType, fullSchema } = require('./schema');
const { mockConsole, restoreConsole } = require('./console');

describe('Generate input schemas', () => {
	beforeEach(() => {
		mockConsole();
	});

	afterEach(() => {
		restoreConsole();
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

	let schema;

	describe('Copy schema elements', () => {
		beforeEach(() => {
			schema = generateInputSchema({
				schema: fullSchema,
				keys: fullSchemaInput,
				operation: 'copySchema',
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
});
