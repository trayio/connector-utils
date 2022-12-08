/*
 * Given a key name for a message or connector, create a user friendly "title"
 * parameter for the connectors.json.
 *
 * FYI - only ever done when not already declared.
 */

const _ = require('lodash');
const { UserInputError } = require('./errors');

// Looks for words between word boundaries. Using `gi` so looks for matches globally and case insensitively
const matchWord = (word) => {
	return new RegExp(`\\b${word}\\b`, 'gi');
};

const IdRegex = matchWord('id');
const IdsRegex = matchWord('ids');
const UrlRegex = matchWord('url');
const DdlRegex = matchWord('ddl');

const handleNameEdgeCases = (sentenceCasedTitle) => {
	return sentenceCasedTitle
		.replace(IdRegex, 'ID')
		.replace(IdsRegex, 'IDs')
		.replace(UrlRegex, 'URL')
		.replace(DdlRegex, 'DDL');
};

module.exports = (name) => {
	if (!name && typeof name !== 'string') {
		throw new UserInputError(
			'Please provide a name value in string format.',
		);
	}
	const title = _.capitalize(_.startCase(name).replace(/_|-/g, ' '));
	return handleNameEdgeCases(title);
};
