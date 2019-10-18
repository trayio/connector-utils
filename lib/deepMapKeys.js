const _ = require('lodash');
// const { DeepMapKeysError } = require('./internal/errors');
/**
 * Maps object keys and formats according to specified casing.
 *
 * @param {Object} collection The collection with keys to iterate over and format.
 * @param {Function} iteratee The format function used to format keys.
 */

const deepMapKeys = (collection, iteratee) => {
	if (Array.isArray(collection)) {
		return collection.map(element => deepMapKeys(element, iteratee));
	}
	if (_.isPlainObject(collection)) {
		return _.transform(collection, function(result, value, key) {
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
