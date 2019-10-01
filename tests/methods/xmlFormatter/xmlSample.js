const xml2jsSample = {
	mediawiki: {
		$: {
			xmlns: 'http://www.mediawiki.org/xml/export-0.3/',
			'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
			'xsi:schemaLocation':
				'http://www.mediawiki.org/xml/export-0.3/ http://www.mediawiki.org/xml/export-0.3.xsd',
			version: '0.3',
			'xml:lang': 'sep11',
		},
		siteinfo: [
			{
				sitename: ['September 11 Memories'],
				base: ['http://sep11.wikipedia.org/wiki/In_Memoriam'],
				generator: ['MediaWiki 1.12alpha'],
				case: ['first-letter'],
				namespaces: [
					{
						namespace: [
							{ _: 'Talk', $: { key: '1' } },
							{ _: 'User', $: { key: '2' } },
						],
					},
				],
			},
		],
		page: [
			{
				title: ['In Memoriam'],
				id: ['6'],
				revision: [
					{
						id: ['398905'],
						timestamp: ['2006-10-29T03:30:51Z'],
						contributor: [{ username: ['Timrem'], id: ['259'] }],
						comment: ['merge from September 11:About'],
						text: [{ $: { id: '398647' } }],
					},
				],
			},
			{
				title: ['Personal experiences'],
				id: ['7'],
				revision: [
					{
						id: ['398866'],
						timestamp: ['2006-10-29T02:02:26Z'],
						contributor: [{ username: ['Timrem'], id: ['259'] }],
						comment: ['subst:ing'],
						text: [{ $: { id: '398608' } }],
					},
				],
			},
			{
				title: ['Category:September 11, 2001'],
				id: ['3304'],
				revision: [
					{
						id: ['398843'],
						timestamp: ['2006-10-28T15:15:49Z'],
						contributor: [{ username: ['Timrem'], id: ['259'] }],
						minor: [''],
						comment: ['+cat'],
						text: [{ $: { id: '398585' } }],
					},
				],
			},
		],
	},
};

module.exports = xml2jsSample;
