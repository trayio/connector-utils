const _ = require('lodash');

const validateValueIsNotObjectLike = value => {
	if (
		typeof value === 'number' ||
		typeof value === 'boolean' ||
		(typeof value === 'string' && value !== '')
	) {
		return value;
	}
	return undefined;
};

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
		// cleaning remaining empty values
		return _.compact(collection.map(removeEmptyObjects));
	}
	if (_.isPlainObject(collection)) {
		const clean_object = _.reduce(
			collection,
			(acc, value, key) => {
				if (_.isObjectLike(value)) {
					// checking if nested elements are empty
					if (_.isEmpty(removeEmptyObjects(value))) {
						return acc;
					}
					acc[key] = removeEmptyObjects(value);
				}
				// checking for regular, non-objectLike values
				if (validateValueIsNotObjectLike(value)) {
					acc[key] = value;
				}
				return acc;
			},
			{},
		);
		// setting null values to remove via _.compact if empty.
		// this will remove empty objects if the child element was populated on first iteration and is now empty.
		return _.isEmpty(clean_object) ? null : clean_object;
	}
	return collection;
};

module.exports = removeEmptyObjects;
