/**
 * Given an array of strings, returns it as a comma-delimited string.
 *
 * @param {Array} arrayToFormat An array of strings.
 * @param {String} [delimiter=','] The string that will separate the values
 * @return {String} Delimited string.
 */

const formatArrayToDelimitedList = ({ arrayToFormat, delimiter = ',' }) => {
	if (arrayToFormat && Array.isArray(arrayToFormat)) {
		return arrayToFormat.join(delimiter);
	}
	return undefined;
};

module.exports = formatArrayToDelimitedList;
