const { UserInputError } = require('./errors');

const setErrorMessage = input =>
	`Expected an array but instead received input of type '${typeof input}'.`;

/**
 * Given an array of strings, returns it as a string delimited by a delimiter.
 *
 * @param {Array} arrayToFormat An array of strings.
 * @param {String} [delimiter=','] The string that will separate the values
 * @return {String} Delimited string.
 */

const formatArrayToDelimitedList = ({ arrayToFormat, delimiter = ',' }) => {
	if (arrayToFormat) {
		if (Array.isArray(arrayToFormat)) {
			return arrayToFormat.join(delimiter);
		}
		throw new UserInputError(setErrorMessage(arrayToFormat));
	}

	return undefined;
};

/**
 * Given an array of strings, returns it as a comma-delimited string.
 *
 * @param {Array} arrayToFormat An array of strings.
 * @return {String} Delimited string.
 */

const formatArray = arrayToFormat =>
    formatArrayToDelimitedList({ arrayToFormat });

/** 
 * 
 * 
 * @param {String} [exclude=''] Types to be excluded separated by comma 
 * @return {Array} Array of string.
 */    
    
const generateAnyType = ({ exclude = '' }) => { 
    if (typeof exclude !== 'string') {
        throw new UserInputError('The type of "exclude" argument must be string.')
     }
    let anyType = ['string','number', 'object','array','boolean','null']
    const excludedTypesArr = exclude.split(',').map(type => (type.trim()));
    anyType =  anyType.filter(type => !excludedTypesArr.includes(type))
    
    return anyType
}

module.exports = { formatArrayToDelimitedList, formatArray, generateAnyType };
