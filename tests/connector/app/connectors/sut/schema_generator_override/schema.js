const { connectorSchema } = require('../../../helpers/schema');
const { generateInputSchema } = require('../../../../../../lib/index');

module.exports = {
	description: 'Schema generator override operation.',
	input: generateInputSchema({
		operation: 'schema_generator_override',
		schema: connectorSchema,
		keys: {
			array_type: {
				description: 'Array type.',
				items: {
					type: 'object',
					title: 'Parent',
					description: 'Array type.',
					properties: {
						name: {
							type: 'string',
							description: 'Name.',
						},
						child: {
							type: 'object',
							title: 'child',
							description: 'Child.',
							properties: {
								name: { type: 'string', description: 'Name.' },
							},
						},
					},
				},
			},
			boolean_type: { description: 'Boolean type.' },
			date_type: { type: 'string', description: 'Date type.' },
			integer_type: { description: 'Integer type.' },
			missing_description: { description: 'Not missing any more.' },
			missing_type: { type: 'string' },
			new_type: { type: 'string', description: 'New type.' },
			number_type: { description: 'Number type.' },
			object_type: {
				description: 'Object type',
				properties: {
					name: {
						type: 'string',
						description: 'Name.',
					},
					child: {
						type: 'object',
						title: 'child',
						description: 'Child.',
						properties: {
							name: { type: 'string', description: 'Name.' },
						},
					},
				},
			},
			one_of_type: {
				oneOf: [
					{
						title: 'Option one',
						type: 'object',
						properties: {
							user_id: {
								title: 'Option one',
								type: 'string',
								description: 'User ID.',
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
							},
						},
					},
					{
						title: 'Option two',
						type: 'object',
						properties: {
							account_id: {
								title: 'Option two',
								type: 'string',
								description: 'Account ID.',
								lookup: {},
								required: true,
							},
						},
					},
				],
			},
			string_type: { description: 'String type.' },
		},
	}),
};
