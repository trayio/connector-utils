const { UserInputError } = require('../../../lib/errors');

describe('Should throw a User Input Error where appropriate', () => {
	test('It should throw a basic error when called', () => {
		const err = () => {
			throw new UserInputError();
		};
		expect(err).toThrow(UserInputError);
	});

	test('It should throw a custom error when custom error is passed', () => {
		const err = () => {
			throw new UserInputError('custom error message');
		};
		expect(err).toThrow('custom error message');
	});
	test('It should include the correct error name in the stack trace.', () => {
		const err = () => {
			throw new UserInputError('custom error message');
		};
		try {
			err();
		} catch (e) {
			console.log(e.stack);
			expect(e.name).toBe('UserInputError');
		}
	});
	test('It should include a body if one is passed', () => {
		const body = {
			key: 'some info',
		};
		const err = () => {
			throw new UserInputError('custom error message', body);
		};
		expect(err).toThrow('custom error message', body);
	});
});
