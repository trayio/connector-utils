const _ = require('lodash');

const removeAuthParams = (collection, additionalKeys = []) => {
	// collection is plain_object ?

	// additionalKeys is array ?

	// additionalKeys contains only strings ?

	return _.omitBy(collection, (value, key) => {
		return key.startsWith('#') || additionalKeys.includes(key);
	});
};

module.exports = removeAuthParams;
