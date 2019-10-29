const { XMLError, DDLError } = require('../../../lib/internal/errors');

describe('Tests should correctly throw XML errors', () => {
	test('It should throw a basic XML error with default message', () => {
		const err = () => {
			throw new XMLError();
		};
		expect(err).toThrow(XMLError);
	});
	test('It should throw a basic XML error with a custom message', () => {
		const err = () => {
			throw new XMLError('Custom error');
		};
		expect(err).toThrow('Custom error');
	});
});

describe('Tests should correctly throw DDL errors', () => {
	test('It should throw a basic DDL error with a default message', () => {
		expect(() => {
			throw new DDLError();
		}).toThrow(DDLError);
	});
	test('It should throw a basic DDL error with a custom message', () => {
		expect(() => {
			throw new DDLError('Custom error');
		}).toThrow('Custom error');
	});
	test('It should throw a basic DDL error with a message and context', () => {
		const customObj = {
			item: 'some context',
		};
		const err = () => {
			throw new DDLError({
				error: 'Custom error',
				context: customObj,
			});
		};
		expect(err).toThrow({
			error: 'Custom error',
			context: customObj,
		});

		// try {
		// 	err();
		// } catch (e) {
		// 	expect(e.context).toBe(customObj);
		// }
	});
});
