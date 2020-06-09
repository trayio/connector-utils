const _ = require('lodash');
const { RemoveAuthError } = require('./internal/errors');

const validateCollection = collection => {
	if (!_.isPlainObject(collection)) {
		throw new RemoveAuthError('The collection must be a plain object.');
	}
};

const validateAdditionalKeys = additionalKeys => {
	if (!Array.isArray(additionalKeys)) {
		throw new RemoveAuthError('AdditionalKeys must be an array.');
	}

	additionalKeys.forEach(key => {
		if (typeof key !== 'string') {
			throw new RemoveAuthError(
				'AdditionalKeys array must only contain strings.',
			);
		}
	});
};

/**
 * Helper for removing '#' keys and additional given keys from a collection.
 *
 * @param {Object} collection A collection to remove '#' keys and additional given keys from.
 * @param {Array} additionalKeys An array of additional key names to remove.
 */

const removeAuthParams = (collection, additionalKeys = []) => {
	validateCollection(collection);
	validateAdditionalKeys(additionalKeys);

	return _.omitBy(collection, (value, key) => {
		return key.startsWith('#') || additionalKeys.includes(key);
	});
};

module.exports = removeAuthParams;
