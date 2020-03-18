const dateType = {
	format: 'datetime',
	date_mask: 'X',
};

const missingType = {
	description: 'The type is missing',
};

const stringType = {
	type: 'string',
	required: true,
};

exports.stringSchema = {
	date_type: dateType,
	missing_type: missingType,
	string_type: stringType,
};
