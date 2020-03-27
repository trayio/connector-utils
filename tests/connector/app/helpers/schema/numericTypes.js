const integerType = {
	type: 'integer',
};

const missingDescription = {
	type: 'integer',
};

const numberType = {
	type: 'number',
	default: 5,
};

exports.numericSchema = {
	integer_type: integerType,
	missing_description: missingDescription,
	number_type: numberType,
};
