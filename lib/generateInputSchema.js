const _ = require('lodash');
const { ConnectorError } = require('./errors');

const checkForIncompleteSchemaElements = element => {
	const schemaKey = Object.keys(element)[0];
	const schemaDefinition = element[schemaKey];
	if (schemaDefinition.oneOf) {
		return _.compact(
			_.flatMapDeep(
				schemaDefinition.oneOf,
				checkForIncompleteSchemaElements,
			),
		);
	} else if (!schemaDefinition.type) {
		return `The schema for key: '${schemaKey}' is missing or ill-defined.`;
	}
};

/**
 * Generates an operation input schema.
 * Will throw if a requested key does not exist.
 * Will not throw if requested key does not exist, but is overridden with
 * at least a type and description.
 *
 * @param {Object} schema The full connector schema definition.
 * @param {Object} [keys] The keys that you wish to extract from the schema with any override values.
 * @return {object} A copy of the requested schema elements.
 */

const generateInputSchema = (schema, keys) => {
	// map the required input parameters to their individual schemas
	const mappedSchema = _.map(keys, (value, key) => ({
		[key]: { ...schema[key], ...value },
	}));
	// find incomplete schema definitions
	const incompleteSchemaKeys = _.compact(
		_.flatMapDeep(mappedSchema, checkForIncompleteSchemaElements),
	);
	// Throw errors for missing schema definitions
	if (incompleteSchemaKeys && incompleteSchemaKeys.length > 0) {
		throw new ConnectorError(incompleteSchemaKeys);
	}
	// combine the individual schemas to a single operation schema
	const combinedSchema = mappedSchema.reduce(
		(acc, curr) => ({ ...acc, ...curr }),
		{},
	);
	// deep clone the schema so that only copies of schema elements are returned
	return _.cloneDeep(combinedSchema);
};

module.exports = generateInputSchema;
