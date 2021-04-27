const { isEmpty, isObjectLike, isPlainObject } = require('lodash');

/**
 * Recursively removes empty objects, arrays and strings from a collection.
 * It's important to note that this method will remove objects & arrays if they
 * become empty as a result of the nested key/value containing an empty object.
 *
 * @param {Object} collection The collection from which to remove empty objects.
 */

const removeEmptyObjects = (collection = {}) => {
	const isEmptyAndNotBoolOrNum = (val) => {
		// 1st 'isEmpty' saves some recursive calls, 2nd ensures parent objects ignored if containing only empty values.
		return (
			!(typeof val === 'boolean' || Number.isFinite(val)) &&
			(isEmpty(val) || isEmpty(removeEmptyObjects(val)))
		);
	};

	if (Array.isArray(collection)) {
		return collection
			.filter((item) => !isEmptyAndNotBoolOrNum(item))
			.map(removeEmptyObjects);
	}

	if (isPlainObject(collection)) {
		return Object.entries(collection).reduce((acc, [key, value]) => {
			return isEmptyAndNotBoolOrNum(value)
				? acc
				: {
						...acc,
						[key]: isObjectLike(value)
							? removeEmptyObjects(value)
							: value,
				  };
		}, {});
	}

	return collection;
};

module.exports = removeEmptyObjects;
