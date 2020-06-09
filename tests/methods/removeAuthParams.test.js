const removeAuthParams = require('../../lib/removeAuthParams');

describe('removeAuthParams', () => {
	it('should remove hash auth only when no additional keys are supplied', () => {
		const hashAuthParams = {
			'#auth': {
				api_key: 'some api key',
				domain: 'some domain',
			},
			param: 'FooBar',
			id: 123,
		};

		expect(removeAuthParams(hashAuthParams)).toEqual({
			param: 'FooBar',
			id: 123,
		});
	});

	it('should remove hash auth and additional keys when they are supplied', () => {
		const hashAuthParams = {
			'#auth': {
				api_key: 'some api key',
				domain: 'some domain',
			},
			api_token: 'some api token',
			api_secret: 'api secret',
			param: 'FooBar',
			id: 123,
		};

		expect(
			removeAuthParams(hashAuthParams, ['api_token', 'api_secret']),
		).toEqual({
			param: 'FooBar',
			id: 123,
		});
	});

	it('should remove additional keys when they are supplied and hash auth is not', () => {
		const hashAuthParams = {
			api_token: 'some api token',
			api_secret: 'api secret',
			param: 'FooBar',
			id: 123,
		};

		expect(
			removeAuthParams(hashAuthParams, ['api_token', 'api_secret']),
		).toEqual({
			param: 'FooBar',
			id: 123,
		});
	});
});
