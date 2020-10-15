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
						enum: ['Three', 'Four'],
					},
					enumValueType: {
						enum: [
							{
								text: 'Three',
								value: 3,
							},
							{
								text: 'Four',
								value: 4,
							},
						],
					},
				},
				operation: 'arrayConcatenate',
			});
			expect(generatedSchema).toEqual({
				enumStringType: {
					description: 'Enum string type.',
					enum: ['One', 'Two', 'Three', 'Three', 'Four'],
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
							text: 'Three',
							value: 3,
						},
						{
							text: 'Four',
							value: 4,
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
						enum: ['Two', 'Five'],
					},
					enumValueType: {
						enum: [
							{
								text: 'One',
								value: 1,
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
					enum: ['Two', 'Five'],
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
							text: 'Five',
							value: 5,
						},
					],
					type: 'integer',
				},
			});
		});

		test('It should index combine arrays by request.', () => {
			const generatedSchema = generateInputSchema({
				schema: fullSchema,
				keys: {
					enumStringType: {
						enum: ['Two', 'Four', 'One', 'Five'],
					},
					enumValueType: {
						enum: [
							{
								value: 4,
							},
							{
								text: 'Five',
							},
						],
					},
				},
				operation: 'arrayCombine',
				arrayMergeType: 'mergeCombineByIndex',
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
							value: 4,
						},
						{
							text: 'Five',
							value: 2,
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

		test('It should index overwrite arrays by request.', () => {
			const generatedSchema = generateInputSchema({
				schema: fullSchema,
				keys: {
					enumStringType: {
						enum: ['Three', 'Four'],
					},
					enumValueType: {
						enum: [
							{},
							{
								text: 'Five',
							},
							{
								value: { key: 'value' },
							},
							{
								text: 'Five',
								value: 1,
							},
						],
					},
				},
				operation: 'arrayCombine',
				arrayMergeType: 'mergeOverwriteByIndex',
			});
			expect(generatedSchema).toEqual({
				enumStringType: {
					description: 'Enum string type.',
					enum: ['Three', 'Four', 'Three'],
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
							text: 'Five',
							value: 2,
						},
						{
							text: 'Three',
							value: { key: 'value' },
						},
						{
							text: 'Five',
							value: 1,
						},
					],
					type: 'integer',
				},
			});
		});
	});
});
