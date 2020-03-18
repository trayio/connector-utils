/* eslint-disable no-console */
let consoleErrorOutput = [];
let consoleTableOutput = [];
let consoleWarnOutput = [];

const originalConsoleError = console.error;
const originalConsoleTable = console.table;
const originalConsoleWarn = console.warn;

const mockedConsoleError = output => consoleErrorOutput.push(output);
const mockedConsoleTable = output => consoleTableOutput.push(output);
const mockedConsoleWarn = output => consoleWarnOutput.push(output);

exports.before = () => {
	consoleErrorOutput = [];
	consoleTableOutput = [];
	consoleWarnOutput = [];
	console.error = mockedConsoleError;
	console.table = mockedConsoleTable;
	console.warn = mockedConsoleWarn;
};
exports.expect = {
	output: {
		array_type: {
			additionalItems: true,
			description: 'Array type.',
			items: {
				description: 'Array type.',
				properties: {
					child: {
						description: 'Child.',
						properties: {
							name: {
								description: 'Name.',
								type: 'string',
							},
						},
						title: 'child',
						type: 'object',
					},
					name: {
						description: 'Name.',
						type: 'string',
					},
				},
				title: 'Parent',
				type: 'object',
			},
			type: 'array',
		},
		boolean_type: {
			description: 'Boolean type.',
			type: 'boolean',
		},
		date_type: {
			date_mask: 'X',
			description: 'Date type.',
			format: 'datetime',
			type: 'string',
		},
		integer_type: {
			type: 'integer',
			description: 'Integer type.',
		},
		missing_description: {
			description: 'Not missing any more.',
			type: 'integer',
		},
		missing_type: {
			description: 'The type is missing',
			type: 'string',
		},
		new_type: {
			description: 'New type.',
			type: 'string',
		},
		number_type: {
			default: 5,
			description: 'Number type.',
			type: 'number',
		},
		object_type: {
			additionalProperties: false,
			description: 'Object type',
			properties: {
				child: {
					description: 'Child.',
					properties: {
						name: {
							description: 'Name.',
							type: 'string',
						},
					},
					title: 'child',
					type: 'object',
				},
				name: {
					description: 'Name.',
					type: 'string',
				},
			},
			title: 'Parent',
			type: 'object',
		},
		one_of_type: {
			description: 'OneOf type.',
			oneOf: [
				{
					properties: {
						user_id: {
							description: 'User ID.',
							lookup: {
								step_settings: {
									company_id: {
										type: 'integer',
										value: '{{{properties.company_id}}}',
									},
								},
							},
							required: true,
							title: 'Option one',
							type: 'string',
						},
					},
					title: 'Option one',
					type: 'object',
				},
				{
					properties: {
						account_id: {
							description: 'Account ID.',
							lookup: {},
							required: true,
							title: 'Option two',
							type: 'string',
						},
					},
					title: 'Option two',
					type: 'object',
				},
			],
			title: 'OneOf',
		},
		string_type: {
			description: 'String type.',
			required: true,
			type: 'string',
		},
	},
};
exports.after = () => {
	console.error = originalConsoleError;
	console.table = originalConsoleTable;
	console.warn = originalConsoleWarn;
	expect(consoleErrorOutput).toEqual([]);
	expect(consoleWarnOutput).toEqual([]);
	expect(consoleTableOutput).toEqual([]);
};
