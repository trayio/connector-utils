const _ = require('lodash');

/**
 * Recursively removes empty objects, arrays and strings from a collection.
 * It's important to note that this method will remove objects if they become empty
 * as a result of the nested key/value containing an empty object (the same goes
 * for arrays).
 *
 * @param {Object} collection The collection from which to remove empty objects.
 */

const removeEmptyObjects = collection => {
	if (Array.isArray(collection)) {
		const new_array = collection.map(removeEmptyObjects);
		return _.compact(new_array);
	} else if (_.isPlainObject(collection)) {
		const new_object = _.reduce(
			collection,
			(acc, value, key) => {
				if (
					!(
						_.isEmpty(removeEmptyObjects(value)) &&
						!Number.isInteger(removeEmptyObjects(value)) &&
						!_.isBoolean(removeEmptyObjects(value))
					)
				) {
					acc[key] = removeEmptyObjects(value);
				}

				return acc;
			},
			{},
		);

		return !_.isEmpty(new_object) ? new_object : undefined;
	} else {
		return _.isEmpty(collection) &&
			!_.isBoolean(collection) &&
			!Number.isInteger(collection)
			? ''
			: collection;
	}
};

module.exports = removeEmptyObjects;
