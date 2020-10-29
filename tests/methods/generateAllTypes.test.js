const { generateAllTypes } = require('../../lib/index');

const BAD_INPUT = 'jhdsagfjhsdagf';

const ALL_TYPES = ['string', 'number', 'object', 'array', 'boolean', 'null'];

describe('generateAllTypes', () => {
	it('should return all available JSON schema types', () => {
		expect(generateAllTypes()).toEqual(ALL_TYPES);
	});
	it('should remove excluded type string', () => {
		expect(generateAllTypes({ exclude: 'string' })).toEqual(
			expect.not.arrayContaining(['string']),
		);
	});
	it('should remove excluded type number', () => {
		expect(generateAllTypes({ exclude: 'number' })).toEqual(
			expect.not.arrayContaining(['number']),
		);
	});
	it('should remove excluded type object', () => {
		expect(generateAllTypes({ exclude: 'object' })).toEqual(
			expect.not.arrayContaining(['object']),
		);
	});
	it('should remove excluded type array', () => {
		expect(generateAllTypes({ exclude: 'array' })).toEqual(
			expect.not.arrayContaining(['array']),
		);
	});
	it('should remove excluded type boolean', () => {
		expect(generateAllTypes({ exclude: 'boolean' })).toEqual(
			expect.not.arrayContaining(['boolean']),
		);
	});
	it('should remove excluded type null', () => {
		expect(generateAllTypes({ exclude: 'null' })).toEqual(
			expect.not.arrayContaining(['null']),
		);
	});
	it('should remove multiple excluded types', () => {
		expect(generateAllTypes({ exclude: 'null,string,object' })).toEqual(
			expect.not.arrayContaining(['null', 'string', 'object']),
		);
	});
	it('should remove multiple excluded types if using space', () => {
		expect(
			generateAllTypes({ exclude: 'null   , string,   object   ' }),
		).toEqual(expect.not.arrayContaining(['null', 'string', 'object']));
	});

	it('should not affect on bad input', () => {
		expect(
			generateAllTypes({
				exclude: `null   , ${BAD_INPUT},   object   `,
			}),
		).toEqual(expect.not.arrayContaining(['null', 'object']));
	});

	it('should throw error if excluded type is not string', () => {
		expect(() => generateAllTypes({ exclude: ['string'] })).toThrow(
			'The type of "exclude" argument must be string.',
		);
	});
});
