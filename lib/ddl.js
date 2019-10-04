const mustache = require('mustache');
const _ = require('lodash');

// Mustaching will set integer values to string
// setting `integer` to true, and passing a path we get integer output
const mustached = (object, text, value, integer = false) => {
	return {
		result: _.uniqBy(
			object.map(item => {
				return {
					text: mustache.render(text, item),
					value: integer
						? _.get(item, value)
						: mustache.render(value, item),
				};
			}),
			'value',
		),
	};
};

const standard = (object, textPath, valuePath) => {
	return {
		result: object.map(item => {
			return {
				text: _.get(item, textPath),
				value: _.get(item, valuePath),
			};
		}),
	};
};

module.exports = {
	mustached,
	standard,
};
