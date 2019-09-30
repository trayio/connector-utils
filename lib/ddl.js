const mustache = require('mustache');
const _ = require('lodash');
const ddl = {};

// Mustaching will set integer values to string
// setting `integer` to true, and passing a path we get integer output
const mustached = (object, text, value, integer = false) => {
	return {
		result: _.uniqBy(
			_.map(object, (item) => {
				return {
					text: mustache.render(text, item),
					value: integer ? _.get(item, value) : mustache.render(value, item)
				};
			}),
			'value'
		)
	};
};

const standard = (object, textPath, valuePath) => {
	return {
		result: _.map(object, (item) => {
			return {
				text: _.get(item, textPath),
				value: _.get(item, valuePath),
			};
		})
	};
};

ddl.mustached = mustached;
ddl.standard = standard;


module.exports = ddl;
