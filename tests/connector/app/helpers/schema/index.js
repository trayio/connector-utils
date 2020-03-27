const { arraySchema } = require('./arrayTypes');
const { booleanSchema } = require('./booleanTypes');
const { numericSchema } = require('./numericTypes');
const { objectSchema } = require('./objectTypes');
const { oneOfSchema } = require('./oneOfTypes');
const { stringSchema } = require('./stringTypes');

module.exports = {
	connectorSchema: {
		...arraySchema,
		...booleanSchema,
		...numericSchema,
		...objectSchema,
		...oneOfSchema,
		...stringSchema,
	},
};
