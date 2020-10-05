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

	describe('Overrides', () => {
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

		test('It should generate schema with deep merge override.', () => {
			const generatedSchema = generateInputSchema({
				schema: fullSchema,
				keys: {
					objectType: {
						properties: {
							child: {
								description: 'Child description.',
								properties: {
									name: {
										type: 'boolean',
										default: true,
									},
								},
							},
						},
					},
				},
				operation: 'testRequestKeyWithOverrides',
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
							description: 'Child description.',
							properties: {
								name: {
									type: 'boolean',
									default: true,
								},
							},
						},
					},
					additionalProperties: false,
				},
			});
		});
	});
});
