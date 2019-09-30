const _ = require('lodash');

const camelCaseKeys = (collection) => {
	if (_.isArray(collection)) {
		return _.map(collection, camelCaseKeys);
	}
	if (_.isPlainObject(collection)) {
		return _.transform(collection, function (result, value, key) {
			return _.set(result, _.camelCase(key), _.isObjectLike(value) ? camelCaseKeys(value) : value);
		});
	}
	return collection;
};

module.exports = camelCaseKeys;
