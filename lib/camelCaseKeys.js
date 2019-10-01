const _ = require('lodash');

const camelCaseKeys = collection => {
	if (Array.isArray(collection)) {
		return collection.map(camelCaseKeys);
	}
	if (_.isPlainObject(collection)) {
		return _.transform(collection, function(result, value, key) {
			return _.set(
				result,
				_.camelCase(key),
				_.isObjectLike(value) ? camelCaseKeys(value) : value,
			);
		});
	}
	return collection;
};

module.exports = camelCaseKeys;
