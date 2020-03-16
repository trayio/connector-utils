const _ = require('lodash');
const { DeepMapKeysError } = require('./internal/errors');

/**
 * Maps object keys and formats according to specified casing.
 *
 * @param {Object} collection The collection with keys to iterate over and format.
 * @param {Function} iteratee The format function used to format keys IE [Lodash]{@link https://lodash.com/docs/4.17.15#camelCase} _.camelCase('some_string').
 */

const deepMapKeys = (collection, iteratee) => {
	if (typeof iteratee !== 'function') {
		throw new DeepMapKeysError('The iteratee must be a function.');
	}
	if (Array.isArray(collection)) {
		return collection.map(element => deepMapKeys(element, iteratee));
	}
	if (_.isPlainObject(collection)) {
		return _.transform(collection, (result, value, key) => {
			return _.set(
				result,
				iteratee(key),
				_.isObjectLike(value) ? deepMapKeys(value, iteratee) : value,
			);
		});
	}
	return collection;
};

module.exports = deepMapKeys;
