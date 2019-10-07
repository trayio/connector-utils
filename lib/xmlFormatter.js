const _ = require('lodash');
const { XMLError } = require('./internal/errors');

/* 
	recursively iterate through output from xml2js library to remove unneeded properties and 
	force objects to arrays. Function takes the object to iterate through, an array of property names to convert to arrays
	and a counter keep track of how many levels of the nested structure iterated through 
*/

const xmlFormatter = (rawObject, treatAsArray, startAcc = false, level) => {
	level = level || 0;

	if (level >= 20) {
		throw new XMLError();
	}

	if (!startAcc) {
		startAcc = {};
	}

	//for each collection value return either value or value merged with keys
	return _.reduce(
		rawObject,
		(acc, value, key) => {
			//since we are merging all values under '$' property with those in the parent object we can ignore these
			if (key === '$') {
				return acc;
			}

			if (_.isObject(value)) {
				const startAcc = Array.isArray(value) ? [] : {};

				//recursively call xmlFormatter to process nested objects/arrays
				acc[key] = xmlFormatter(value, treatAsArray, startAcc, level++);

				const isAttributes = _.keys(value).includes('$');
				//if the current value contains the '$' property then merge these nested properties with the current value
				if (isAttributes) {
					acc[key] = _.assign(acc[key], value['$']);
				}

				//if the current key is listed as one that should be an array, convert to array before returning
				if (_.includes(treatAsArray, key)) {
					acc[key] = _.toArray(acc[key]);
				}
			} else {
				acc[key] = value;
			}

			return acc;
		},
		startAcc,
	);
};

module.exports = xmlFormatter;
