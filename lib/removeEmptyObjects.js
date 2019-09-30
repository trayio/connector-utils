const _ = require('lodash');

const removeEmptyObjects = (collection) => {
	if (_.isArray(collection)) {
		const new_array = _.map(collection, removeEmptyObjects);
		return _.compact(new_array);
	} else if (_.isObject(collection)) {
		const new_object = _.reduce(
			collection,
			(acc, value, key) => {
				if (
					!(
						_.isEmpty(removeEmptyObjects(value)) &&
						!_.isNumber(removeEmptyObjects(value)) &&
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
		return _.isEmpty(collection) && !_.isBoolean(collection) && !_.isNumber(collection)
			? ''
			: collection;
	}
};

module.exports = removeEmptyObjects;
