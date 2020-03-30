/**
 * Given an array of strings, returns it as a comma-delimited string.
 *
 * @param {Object} arrayToFormat An array of strings.
 * @return {String} A comma-delimited string.
 */

const formatArrayToCommaDelimitedList = ({ arrayToFormat }) => {
	if (arrayToFormat && Array.isArray(arrayToFormat)) {
		return arrayToFormat.join(',');
	}
	return undefined;
};

module.exports = formatArrayToCommaDelimitedList;
