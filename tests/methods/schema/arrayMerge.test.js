// merge types
// concatenate (default) (concatenate)
// object (combine by index position) (combine)
// replace (overwrite completely) (overwrite)
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

	describe('Array merge', () => {
		test('It should concatenate arrays by default.', () => {
			const generatedSchema = generateInputSchema({
				schema: fullSchema,
				keys: {
					enumStringType: {
						enum: ['Four', 'Five'],
					},
					enumValueType: {
						enum: [
							{
								text: 'Four',
								value: 4,
							},
							{
								text: 'Five',
								value: 5,
							},
						],
					},
				},
				operation: 'arrayConcatenateDefault',
			});
			expect(generatedSchema).toEqual({
				enumStringType: {
					description: 'Enum string type.',
					enum: ['One', 'Two', 'Three', 'Four', 'Five'],
					type: 'string',
				},
				enumValueType: {
					description: 'Enum value type.',
					enum: [
						{
							text: 'One',
							value: 1,
						},
						{
							text: 'Two',
							value: 2,
						},
						{
							text: 'Three',
							value: 3,
						},
						{
							text: 'Four',
							value: 4,
						},
						{
							text: 'Five',
							value: 5,
						},
					],
					type: 'integer',
				},
			});
		});

		test('It should concatenate arrays by request.', () => {
			const generatedSchema = generateInputSchema({
				schema: fullSchema,
				keys: {
					enumStringType: {
						enum: ['Four', 'Five'],
					},
					enumValueType: {
						enum: [
							{
								text: 'Four',
								value: 4,
							},
							{
								text: 'Five',
								value: 5,
							},
						],
					},
				},
				operation: 'arrayConcatenate',
				arrayMergeType: 'concatenate',
			});
			expect(generatedSchema).toEqual({
				enumStringType: {
					description: 'Enum string type.',
					enum: ['One', 'Two', 'Three', 'Four', 'Five'],
					type: 'string',
				},
				enumValueType: {
					description: 'Enum value type.',
					enum: [
						{
							text: 'One',
							value: 1,
						},
						{
							text: 'Two',
							value: 2,
						},
						{
							text: 'Three',
							value: 3,
						},
						{
							text: 'Four',
							value: 4,
						},
						{
							text: 'Five',
							value: 5,
						},
					],
					type: 'integer',
				},
			});
		});

		test('It should overwrite arrays by request.', () => {
			const generatedSchema = generateInputSchema({
				schema: fullSchema,
				keys: {
					enumStringType: {
						enum: ['Four', 'Five'],
					},
					enumValueType: {
						enum: [
							{
								text: 'Four',
								value: 4,
							},
							{
								text: 'Five',
								value: 5,
							},
						],
					},
				},
				operation: 'arrayOverwrite',
				arrayMergeType: 'overwrite',
			});
			expect(generatedSchema).toEqual({
				enumStringType: {
					description: 'Enum string type.',
					enum: ['Four', 'Five'],
					type: 'string',
				},
				enumValueType: {
					description: 'Enum value type.',
					enum: [
						{
							text: 'Four',
							value: 4,
						},
						{
							text: 'Five',
							value: 5,
						},
					],
					type: 'integer',
				},
			});
		});

		test('It should combine arrays by request.', () => {
			const generatedSchema = generateInputSchema({
				schema: fullSchema,
				keys: {
					enumStringType: {
						enum: ['Four', 'Five'],
					},
					enumValueType: {
						enum: [
							{
								text: 'Four',
								value: 4,
							},
							{
								text: 'Five',
								value: 5,
							},
						],
					},
				},
				operation: 'arrayCombine',
				arrayMergeType: 'combine',
			});
			expect(generatedSchema).toEqual({
				enumStringType: {
					description: 'Enum string type.',
					enum: ['One', 'Two', 'Three', 'Four', 'Five'],
					type: 'string',
				},
				enumValueType: {
					description: 'Enum value type.',
					enum: [
						{
							text: 'Four',
							value: 4,
						},
						{
							text: 'Five',
							value: 5,
						},
						{
							text: 'Three',
							value: 3,
						},
					],
					type: 'integer',
				},
			});
		});
	});
});
