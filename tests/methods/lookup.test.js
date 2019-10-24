const { lookup } = require('../../lib/index').schema;
describe('Lookup objects should be correctly outputted', () => {
	test('It should output a basic lookup object if only a message is passed', () => {
		expect(lookup('run_operation')).toEqual({
			url: '{{{step.ephemeral_url}}}',
			body: {
				auth_id: '{{{step.auth_id}}}',
				step_settings: {},
				message: 'run_operation',
			},
		});
	});

	test('It should add custom step_settings if set', () => {
		expect(
			lookup('run_operation', {
				auth: {
					type: 'jsonpath',
					value: '$.auth',
				},
			}),
		).toEqual({
			url: '{{{step.ephemeral_url}}}',
			body: {
				auth_id: '{{{step.auth_id}}}',
				step_settings: {
					auth: {
						type: 'jsonpath',
						value: '$.auth',
					},
				},
				message: 'run_operation',
			},
		});
	});

	test('It should throw an error if the message is null', () => {
		expect(() => lookup(null)).toThrow(
			`The lookup 'message' cannot be null or empty.`,
		);
	});

	test('It should throw an error if the message is empty', () => {
		expect(() => lookup('')).toThrow(
			`The lookup 'message' cannot be null or empty.`,
		);
	});

	test('It should throw an error if the message is not a String type', () => {
		expect(() => lookup(100)).toThrow(
			`The lookup 'message' must be a String type.`,
		);
	});
});
