const xml2jsSample = {
	sample: {
		chartest: { _: 'Character data here!', $: { desc: 'Test for CHARs' } },
		cdatatest: {
			_: 'CDATA here!',
			$: { desc: 'Test for CDATA', misc: 'true' },
		},
		cdatawhitespacetest: {
			_: '   ',
			$: { desc: 'Test for CDATA with whitespace', misc: 'true' },
		},
		nochartest: { $: { desc: 'No data', misc: 'false' } },
		nochildrentest: { $: { desc: 'No data', misc: 'false' } },
		whitespacetest: {
			_: '\n\tLine One\n\tLine Two\n',
			$: { desc: 'Test for normalizing and trimming' },
		},
		listtest: {
			$: { attr: 'Attribute' },
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
		ordertest: { one: ['1', '4'], two: ['2', '5'], three: ['3', '6'] },
		validatortest: {
			emptyarray: '',
			oneitemarray: { item: 'Bar.' },
			numbertest: '42',
			stringtest: '43',
		},
		'pfx:top': {
			$: { 'xmlns:pfx': 'http://foo.com', 'pfx:attr': 'baz' },
			middle: { $: { xmlns: 'http://bar.com' } },
		},
		attrNameProcessTest: {
			$: {
				camelCaseAttr: 'camelCaseAttrValue',
				lowercaseattr: 'lowercaseattrvalue',
			},
		},
		attrValueProcessTest: {
			$: {
				camelCaseAttr: 'camelCaseAttrValue',
				lowerCaseAttr: 'lowercaseattrvalue',
			},
		},
		tagNameProcessTest: '',
		valueProcessTest: 'some value',
		textordertest: {
			_: 'this is text with     in the middle',
			b: 'markup',
			em: 'like this',
		},
	},
};

module.exports = xml2jsSample;
