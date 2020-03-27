const { connectorSchema } = require('../../../helpers/schema');
const { generateInputSchema } = require('../../../../../../lib/index');

module.exports = {
	description: 'Schema generator operation.',
	input: generateInputSchema({
		operation: 'schema_generator',
		schema: connectorSchema,
		keys: {
			array_type: {},
			boolean_type: {},
			date_type: {},
			integer_type: {},
			missing_description: {},
			missing_type: {},
			number_type: {},
			object_type: {},
			one_of_type: {},
			string_type: {},
		},
	}),
};
