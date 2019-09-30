const lookup = ({ message, step_settings = {} }) => {
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