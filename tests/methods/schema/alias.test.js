const { generateInputSchema } = require('../../../lib/index');
const { fullSchema } = require('./schema');
const { mockConsole, restoreConsole } = require('./console');

describe('Generate input schemas', () => {
	beforeEach(() => {
		mockConsole();
	});

	afterEach(() => {
		restoreConsole();
	});

	describe('Aliases', () => {
		test('It should generate schema with top level aliases.', () => {
			const generatedSchema = generateInputSchema({
				schema: fullSchema,
				keys: {
					booleanType: { alias: 'booleanAlias' },
					dateType: { alias: 'dateAlias' },
					stringType: { alias: '' },
				},
				operation: 'topLevelAliases',
			});
			expect(generatedSchema).toEqual({
				booleanAlias: {
					type: 'boolean',
				},
				dateAlias: {
					date_mask: 'X',
					format: 'datetime',
				},
				stringType: {
					required: true,
					type: 'string',
				},
			});
		});

		test('It should generate schema with deep aliases.', () => {
			const generatedSchema = generateInputSchema({
				schema: {},
				keys: {
					objectType: {
						alias: 'aliasType',
						type: 'object',
						title: 'Parent',
						properties: {
							name: {
								alias: '', // no alias defined so don't use it
								type: 'string',
							},
							child: {
								alias: 'aliasChild',
								title: 'child',
								properties: {
									name: { type: 'string' },
								},
							},
						},
						additionalProperties: false,
					},
				},
				operation: 'deepAliases',
			});
			expect(generatedSchema).toEqual({
				aliasType: {
					type: 'object',
					title: 'Parent',
					properties: {
						name: {
							type: 'string',
						},
						aliasChild: {
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
	});
});
