const mustache = require('mustache');
const _ = require('lodash');
const ddl = {};

const mustached = (object, text, value) => {
	return {
		result: _.uniqBy(
			_.map(object, (item) => {
				return {
					text: mustache.render(text, item),
					value: mustache.render(value, item)
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
