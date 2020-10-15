/* eslint-disable no-console */
const _ = require('lodash');
require('deepdash/addOmitDeep')(_);
const deepmerge = require('deepmerge');
const deepMapKeys = require('./deepMapKeys');
const logger = require('./internal/logger');

const INPUT_SCHEMA_PROBLEMS_MESSAGE =
	'There are problems with the generated input schema:';

const flattenAndCompact = ({ array }) => _.flattenDeep(_.compact(array));

const logIssuesToConsole = ({ issues }) => {
	if (issues.some((error) => error.missing === 'type')) {
		logger.log('error', INPUT_SCHEMA_PROBLEMS_MESSAGE);
	} else {
		logger.log('warn', INPUT_SCHEMA_PROBLEMS_MESSAGE);
	}
	logger.log(
		'table',
		issues.map((error) => ({
			key: error.key,
			[error.missing]: 'missing',
		})),
		['key', 'type', 'description', 'full stop'],
	);
};

const shouldInvokeIteratee = ({ value, key }) =>
	// ignore lookups, object properties and oneOf arrays
	!['lookup', 'properties'].includes(key) && !Array.isArray(value.oneOf);

const shouldParseChildren = ({ key }) => !['lookup'].includes(key);

/**
 * Deep recursive iteration through a full schema object definition.
 * Returns a flat array of objects specifying the missing keys.
 * Validation rules are specified in the iteratee.
 */
const deepValidateSchema = ({ collection, iteratee, path = 'schema' }) => {
	const recursiveArray = ({ col, fn, oPath }) => {
		return Array.isArray(col)
			? col.map((element) =>
					deepValidateSchema({
						collection: element,
						iteratee: fn,
						path: oPath,
					}),
			  )
			: [];
	};

	const issues = [];

	issues.push(recursiveArray({ col: collection, fn: iteratee, oPath: path }));

	if (_.isPlainObject(collection)) {
		_.forEach(collection, (value, key) => {
			issues.push(
				recursiveArray({
					col: value,
					fn: iteratee,
					oPath: `${path}.${key}`,
				}),
			);

			if (_.isPlainObject(value)) {
				if (shouldInvokeIteratee({ value, key })) {
					issues.push(
						iteratee({ element: value, key: `${path}.${key}` }),
					);
				}
				if (shouldParseChildren({ key })) {
					issues.push(
						deepValidateSchema({
							collection: value,
							iteratee,
							path: `${path}.${key}`,
						}),
					);
				}
			}
		});
	}

	return flattenAndCompact({ array: issues });
};

// Schema elements must include 'type' and 'description' keys.
const checkForIncompleteSchemaElements = ({ element, key }) => {
	const keys = Object.keys(element);
	const incompleteSchemaElements = [];
	if (_.isPlainObject(element)) {
		if (!keys.includes('type')) {
			incompleteSchemaElements.push({ key, missing: 'type' });
		}
		if (!keys.includes('description')) {
			incompleteSchemaElements.push({ key, missing: 'description' });
		} else if (!_.get(element, 'description', '.').endsWith('.')) {
			incompleteSchemaElements.push({ key, missing: 'full stop' });
		}
	}
	return incompleteSchemaElements;
};

// target is the original array that you wish to merge into
// source is the array that you wish to merge into the target array
const combineByIndex = (target, source, options, overwrite = false) => {
	const concatenate = !overwrite;
	const destination = target.slice();

	source.forEach((item, index) => {
		if (typeof destination[index] === 'undefined') {
			destination[index] = options.cloneUnlessOtherwiseSpecified(
				item,
				options,
			);
		} else if (options.isMergeableObject(item)) {
			destination[index] = deepmerge(target[index], item, options);
		} else if (concatenate && target.indexOf(item) === -1) {
			destination.push(item);
		} else if (overwrite) {
			destination[index] = item;
		}
	});

	return destination;
};

const arrayMergeFunctions = {
	mergeCombineByIndex: (target, source, options) =>
		combineByIndex(target, source, options),

	mergeOverwriteByIndex: (target, source, options) =>
		combineByIndex(target, source, options, true),

	overwrite: (target, source) => source,
};

/**
 * Generates an operation input schema.
 * Will log to the console if a requested key does not exist.
 * Will not log to the console if requested key does not exist,
 *   but is overridden with at least a type and description.
 *
 * @param {Object} schema The full connector schema definition.
 * @param {Object} keys The keys that you wish to extract from the schema with any override values.
 * @param {String} operation The name of the connector operation that you are generating the schema for.
 *   This will be used as the root of the object path when logging validation issues.
 * @param {String} arrayMergeType The type of merging algorithm to be used for arrays.
 *   Possible algorithms are concatenate (default), mergeCombineByIndex, mergeOverwriteByIndex or overwrite.
 *     concatenate - merge arrays by concatenating values (default)
 *     mergeCombineByIndex - merge/combine arrays by index value (arrays of objects will merge by index if possible, other types will concatenate)
 *     mergeOverwriteByIndex - merge/overwrite arrays by index value (arrays of objects will merge by index value if possible, other types will overwrite by index value)
 *     overwrite - overwrite original array with specified array
 * @return {object} A copy of the requested schema elements.
 */
const generateInputSchema = ({
	schema = {},
	keys = {
		key_name: {
			type: 'string',
			description: 'Description.',
			title: '',
			default: '',
		},
	},
	operation = 'schema',
	arrayMergeType = 'concatenate',
}) => {
	// map the required input parameters to their individual schemas
	// and override with any additionally provided values
	const mappedSchema = _.map(keys, (value, key) => {
		return {
			[key]: deepmerge(schema[key], value, {
				arrayMerge: arrayMergeFunctions[arrayMergeType],
			}),
		};
	});

	// deep map change keys to aliases
	const aliasedSchema = deepMapKeys(mappedSchema, (key, value) => {
		const { alias } = value;
		return alias || key;
	});

	// deep remove original alias keys
	const transformedSchema = _.omitDeep(aliasedSchema, 'alias');

	// find incomplete schema definitions
	const incompleteSchemaErrors = deepValidateSchema({
		collection: transformedSchema,
		iteratee: checkForIncompleteSchemaElements,
		path: operation,
	});

	// Log issues for missing schema definitions to console
	if (incompleteSchemaErrors.length > 0) {
		logIssuesToConsole({ issues: incompleteSchemaErrors });
	}

	// combine the individual schemas to a single operation schema
	const combinedSchema = transformedSchema.reduce(
		(acc, curr) => ({ ...acc, ...curr }),
		{},
	);

	// deep clone the schema so that only copies of schema elements are returned
	return _.cloneDeep(combinedSchema);
};

module.exports = generateInputSchema;
