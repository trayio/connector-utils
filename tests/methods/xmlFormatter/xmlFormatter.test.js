const xmlFormatter = require('../../../lib/xmlFormatter');
const xml2jsSample = require('./xmlSample');

describe('XML outputs should be formatted to correct JSON', () => {
	test('It should correctly format XML2JS JSON to regular JSON', () => {
		expect(xmlFormatter(xml2jsSample)).toEqual({
			sample: {
				chartest: {
					_: 'Character data here!',
					desc: 'Test for CHARs',
				},
				cdatatest: {
					_: 'CDATA here!',
					desc: 'Test for CDATA',
					misc: 'true',
				},
				cdatawhitespacetest: {
					_: '   ',
					desc: 'Test for CDATA with whitespace',
					misc: 'true',
				},
				nochartest: { desc: 'No data', misc: 'false' },
				nochildrentest: { desc: 'No data', misc: 'false' },
				whitespacetest: {
					_: '\n\tLine One\n\tLine Two\n',
					desc: 'Test for normalizing and trimming',
				},
				listtest: {
					item: [
						{
							_:
								'\n\t\tThis  is\n\t\t\n\t\tcharacter\n\t\t\n\t\tdata!\n\t\t\n\t',
							subitem: ['Foo(1)', 'Foo(2)', 'Foo(3)', 'Foo(4)'],
						},
						'Qux.',
						'Quux.',
					],
					single: 'Single',
					attr: 'Attribute',
				},
				arraytest: {
					item: [{ subitem: 'Baz.' }, { subitem: ['Foo.', 'Bar.'] }],
				},
				emptytest: '',
				tagcasetest: {
					tAg: 'something',
					TAG: 'something else',
					tag: 'something third',
				},
				ordertest: {
					one: ['1', '4'],
					two: ['2', '5'],
					three: ['3', '6'],
				},
				validatortest: {
					emptyarray: '',
					oneitemarray: { item: 'Bar.' },
					numbertest: '42',
					stringtest: '43',
				},
				'pfx:top': {
					middle: { xmlns: 'http://bar.com' },
					'xmlns:pfx': 'http://foo.com',
					'pfx:attr': 'baz',
				},
				attrNameProcessTest: {
					camelCaseAttr: 'camelCaseAttrValue',
					lowercaseattr: 'lowercaseattrvalue',
				},
				attrValueProcessTest: {
					camelCaseAttr: 'camelCaseAttrValue',
					lowerCaseAttr: 'lowercaseattrvalue',
				},
				tagNameProcessTest: '',
				valueProcessTest: 'some value',
				textordertest: {
					_: 'this is text with     in the middle',
					b: 'markup',
					em: 'like this',
				},
			},
		});
	});

	test('It should correctly format XML2JS JSON to regular JSON, when treating custom elements as arrays', () => {
		expect(xmlFormatter(xml2jsSample, 'chartest')).toEqual({
			sample: {
				chartest: ['Character data here!', 'Test for CHARs'],
				cdatatest: {
					_: 'CDATA here!',
					desc: 'Test for CDATA',
					misc: 'true',
				},
				cdatawhitespacetest: {
					_: '   ',
					desc: 'Test for CDATA with whitespace',
					misc: 'true',
				},
				nochartest: { desc: 'No data', misc: 'false' },
				nochildrentest: { desc: 'No data', misc: 'false' },
				whitespacetest: {
					_: '\n\tLine One\n\tLine Two\n',
					desc: 'Test for normalizing and trimming',
				},
				listtest: {
					item: [
						{
							_:
								'\n\t\tThis  is\n\t\t\n\t\tcharacter\n\t\t\n\t\tdata!\n\t\t\n\t',
							subitem: ['Foo(1)', 'Foo(2)', 'Foo(3)', 'Foo(4)'],
						},
						'Qux.',
						'Quux.',
					],
					single: 'Single',
					attr: 'Attribute',
				},
				arraytest: {
					item: [{ subitem: 'Baz.' }, { subitem: ['Foo.', 'Bar.'] }],
				},
				emptytest: '',
				tagcasetest: {
					tAg: 'something',
					TAG: 'something else',
					tag: 'something third',
				},
				ordertest: {
					one: ['1', '4'],
					two: ['2', '5'],
					three: ['3', '6'],
				},
				validatortest: {
					emptyarray: '',
					oneitemarray: { item: 'Bar.' },
					numbertest: '42',
					stringtest: '43',
				},
				'pfx:top': {
					middle: { xmlns: 'http://bar.com' },
					'xmlns:pfx': 'http://foo.com',
					'pfx:attr': 'baz',
				},
				attrNameProcessTest: {
					camelCaseAttr: 'camelCaseAttrValue',
					lowercaseattr: 'lowercaseattrvalue',
				},
				attrValueProcessTest: {
					camelCaseAttr: 'camelCaseAttrValue',
					lowerCaseAttr: 'lowercaseattrvalue',
				},
				tagNameProcessTest: '',
				valueProcessTest: 'some value',
				textordertest: {
					_: 'this is text with     in the middle',
					b: 'markup',
					em: 'like this',
				},
			},
		});
	});
});
