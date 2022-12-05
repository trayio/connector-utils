/* eslint-disable no-void */
const assert = require('assert');

const {
	randHex,
	guid,
	startsWith,
	camelCase,
	unCamelCase,
	sentenceCase,
	trim,
	typecast,
	lowerCase,
} = require('../../../lib/internal/mout');

describe('utils/mout - randHex', () => {
	it('should return a random hexadecimal value', () => {
		const a = randHex();
		const b = randHex();
		assert.notStrictEqual(a, b);
	});

	it('should return a 6 char length hex value by default', () => {
		assert.strictEqual(randHex().length, 6);
		assert.strictEqual(randHex(0).length, 6);
	});

	it('should allow custom length', () => {
		assert.strictEqual(randHex(2).length, 2);
		assert.strictEqual(randHex(5).length, 5);
		assert.strictEqual(randHex(10).length, 10);
	});

	it('should handle negative size', () => {
		assert.strictEqual(randHex(-5).length, 6);
	});
});

describe('utils/mout - guid', () => {
	it('returns a random guid each call', () => {
		const a = guid();
		const b = guid();

		// match guid v4 format e.g. 3f2504e0-2f89-41d3-9a0c-0305e82c3301
		assert(
			/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[ab89][a-f0-9]{3}-[a-f0-9]{12}/.test(
				a,
			),
		);
		assert.notStrictEqual(a, b);
	});
});

describe('utils/mout - startsWith', () => {
	it('should return true if string starts with prefix', () => {
		assert(startsWith('lorem-ipsum', 'lorem'));
	});

	it('should return false if string does not start with prefix', () => {
		assert(!startsWith('lorem-ipsum', 'ipsum'));
	});

	it('should return true if prefix is empty', () => {
		assert(startsWith('', ''));
		assert(startsWith('lorem', ''));
	});

	it('should treat undefined as empty string', () => {
		assert(!startsWith(void 0, 'ipsum'));
		assert(startsWith('lorem', void 0));
	});

	it('should treat null as empty string', () => {
		assert(startsWith(null, ''));
		assert(startsWith('lorem', null));
	});
});

describe('utils/mout - camelCase', () => {
	it('should convert hyphenated text to camelCase', () => {
		const str = 'lorem-ipsum-dolor';
		assert.strictEqual(camelCase(str), 'loremIpsumDolor');
	});

	it('should convert spaces to camelCase', () => {
		const str = '  lorem ipsum  dolor  ';
		assert.strictEqual(camelCase(str), 'loremIpsumDolor');
	});

	it('should convert underscores to camelCase', () => {
		const str = 'lorem_ipsum_dolor';
		assert.strictEqual(camelCase(str), 'loremIpsumDolor');
	});

	it('should remove non word', () => {
		const str = ' #$  lorem ipsum ^ &:  dolor ++ ';
		assert.strictEqual(camelCase(str), 'loremIpsumDolor');
	});

	it('should replace accents', () => {
		const str = 'spéçïãl chârs';
		assert.strictEqual(camelCase(str), 'specialChars');
	});

	it('should do it all at once', () => {
		const str = '  %$ & lorem Ipsum @ dolor spéçïãl  ! chârs  )( )  ';
		assert.strictEqual(camelCase(str), 'loremIpsumDolorSpecialChars');
	});

	it('should treat null as empty string', () => {
		assert.strictEqual(camelCase(null), '');
	});

	it('should treat undefined as empty string', () => {
		assert.strictEqual(camelCase(void 0), '');
	});
});

describe('utils/mout - unCamelCase', () => {
	it('should add space between camelCase text', () => {
		assert.strictEqual(unCamelCase('loremIpsumDolor'), 'lorem ipsum dolor');
		assert.strictEqual(
			unCamelCase('lorem IpsumDolor'),
			'lorem ipsum dolor',
		);
	});

	it('should use specified separator', () => {
		const str = 'loremIpsumDolor';
		assert.strictEqual(unCamelCase(str, '-'), 'lorem-ipsum-dolor');
	});

	it('should treat null as empty string', () => {
		assert.strictEqual(unCamelCase(null), '');
	});

	it('should treat undefined as empty string', () => {
		assert.strictEqual(unCamelCase(void 0), '');
	});
});

describe('utils/mout - sentenceCase', () => {
	it('should uppercase first char of each sentence and lowercase others', () => {
		const str = 'lorem Ipsum doLOr. sit amet dolor.';
		assert.strictEqual(
			sentenceCase(str),
			'Lorem ipsum dolor. Sit amet dolor.',
		);
	});

	it('should treat null as empty string', () => {
		assert.strictEqual(sentenceCase(null), '');
	});

	it('should treat undefined as empty string', () => {
		assert.strictEqual(sentenceCase(void 0), '');
	});
});

describe('utils/mout - trim', () => {
	it('should remove whitespaces from begin and end of string', () => {
		const str = '   \t \t \t\t     lorem  ipsum    \t \t  \t\t  ';
		assert.strictEqual(trim(str), 'lorem  ipsum');
	});

	it('should remove specified chars from begin and end of string', () => {
		const str = '-+-*test*-+-';
		const chars = ['-', '+', '*'];
		assert.strictEqual(trim(str, chars), 'test');
	});

	it('should treat null as empty string', () => {
		assert.strictEqual(trim(null), '');
	});

	it('should treat undefined as empty string', () => {
		assert.strictEqual(trim(void 0), '');
	});
});

describe('utils/mout - typecast', () => {
	it('should typecast values if Number, Boolean, null or undefined', () => {
		assert.strictEqual(typecast('true'), true);
		assert.strictEqual(typecast('false'), false);
		assert.strictEqual(typecast('123'), 123);
		assert.strictEqual(typecast('123.45'), 123.45);
		assert.strictEqual(typecast('null'), null);
		assert.strictEqual(typecast(null), null);
		assert.strictEqual(typecast('undefined'), undefined);
		assert.strictEqual(typecast(), undefined);
		assert.strictEqual(typecast('foo'), 'foo');
	});
});

describe('string/lowerCase()', () => {
	it('should convert string to lower case', () => {
		assert.strictEqual(lowerCase('FOO'), 'foo');
		assert.strictEqual(lowerCase('Bar'), 'bar');
		assert.strictEqual(lowerCase('ipsum'), 'ipsum');
	});

	it('should treat null as empty string', () => {
		assert.strictEqual(lowerCase(null), '');
	});

	it('should treat undefined as empty string', () => {
		assert.strictEqual(lowerCase(void 0), '');
	});
});
