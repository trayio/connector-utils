const { LookupError } = require('./internal/errors');
/**
 * Generates a lookup object for DDL operations.
 *
 * @param {String} message The DDL operation that is run when the lookup is executed.
 * @param {Object} [step_settings={}] The custom step settings for the lookup.
 */

const lookup = (message, step_settings = {}) => {
	if (message === 'null') {
		throw new LookupError(`The lookup 'message' cannot be null.`);
	}
	if (typeof message !== 'string') {
		throw new LookupError(`The lookup 'message' must be a String type.`);
	}
	return {
		url: '{{{step.ephemeral_url}}}',
		body: {
			auth_id: '{{{step.auth_id}}}',
			step_settings,
			message,
		},
	};
};

module.exports = lookup;
