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

	describe('Generate schemas', () => {
		test('It should generate schema from requested key.', () => {
			const generatedSchema = generateInputSchema({
				schema: fullSchema,
				keys: {
					objectType: {},
				},
				operation: 'generateByKey',
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

		test('It should generate schema with deep merge.', () => {
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
				operation: 'generateByKeyWithDeepMerge',
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
