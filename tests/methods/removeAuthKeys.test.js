const removeAuthKeys = require('../../lib/removeAuthKeys');

describe('removeAuthKeys', () => {
	it('should remove hash auth only when no additional keys are supplied', () => {
		const hashAuthParams = {
			'#auth': {
				api_key: 'some api key',
				domain: 'some domain',
			},
			param: 'FooBar',
			id: 123,
		};

		expect(removeAuthKeys(hashAuthParams)).toEqual({
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
			api_secret: 'some api secret',
			param: 'FooBar',
			id: 123,
		};

		expect(
			removeAuthKeys(hashAuthParams, ['api_token', 'api_secret']),
		).toEqual({
			param: 'FooBar',
			id: 123,
		});
	});

	it('should remove additional keys when they are supplied and hash auth is not', () => {
		const nonHashAuthParams = {
			api_token: 'some api token',
			api_secret: 'some api secret',
			param: 'FooBar',
			id: 123,
		};

		expect(
			removeAuthKeys(nonHashAuthParams, ['api_token', 'api_secret']),
		).toEqual({
			param: 'FooBar',
			id: 123,
		});
	});

	it('should throw an error when the collection is not a plain object', () => {
		const someArray = [];

		expect(() => removeAuthKeys(someArray)).toThrow(
			'The collection must be a plain object.',
		);
	});

	it('should throw an error when the additional keys is not an array', () => {
		const hashAuthParams = {
			'#auth': {
				api_key: 'some api key',
			},
			id: 123,
		};
		const additionalKeys = {};

		expect(() => removeAuthKeys(hashAuthParams, additionalKeys)).toThrow(
			'AdditionalKeys must be an array.',
		);
	});

	it('should throw an error when the additional keys array contains non string types', () => {
		const hashAuthParams = {
			'#auth': {
				api_key: 'some api key',
			},
			id: 123,
		};
		const additionalKeys = [123, undefined, {}];

		expect(() => removeAuthKeys(hashAuthParams, additionalKeys)).toThrow(
			'AdditionalKeys array must only contain strings.',
		);
	});
});
