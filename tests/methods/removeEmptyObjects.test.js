const { removeEmptyObjects } = require('../../lib/index');

describe('Helper should remove all empty objects from the payload', () => {
	test('It removes only empty objects, strings, arrays, null and undefined from top level of object', () => {
		expect(
			removeEmptyObjects({
				key: '',
				key2: 'someval',
				key3: {},
				key4: 'other value',
				key5: ['foo', 'bar'],
				key6: false,
				key7: undefined,
				key8: null,
				key9: [],
				key10: 0,
			}),
		).toEqual({
			key2: 'someval',
			key4: 'other value',
			key5: ['foo', 'bar'],
			key6: false,
			key10: 0,
		});
	});

	test('It removes nested empty objects from object', () => {
		expect(
			removeEmptyObjects({
				key1: 'value',
				key2: {
					nested: {},
					nested2: 'value',
				},
				key3: 'val',
			}),
		).toEqual({
			key1: 'value',
			key2: {
				nested2: 'value',
			},
			key3: 'val',
		});
	});

	test('It removes objects containing keys with empty values', () => {
		expect(
			removeEmptyObjects({
				key1: 'value',
				key2: {
					nested: {
						nested2: {},
					},
				},
				key3: 'someval',
				key4: true,
				key5: 5,
			}),
		).toEqual({
			key1: 'value',
			key3: 'someval',
			key4: true,
			key5: 5,
		});
	});

	test('It removes empty objects from array of objects', () => {
		expect(
			removeEmptyObjects({
				key1: 'value',
				key2: [
					{
						nested: {
							deep: {},
						},
						nested2: 'value',
					},
					{},
					{
						nested: 'value',
					},
				],
			}),
		).toEqual({
			key1: 'value',
			key2: [
				{
					nested2: 'value',
				},
				{
					nested: 'value',
				},
			],
		});
	});

	test('It removes empty arrays', () => {
		expect(
			removeEmptyObjects({
				key1: 'value',
				key2: [],
				key3: [
					{
						nested: {},
					},
					{
						nested: {},
					},
				],
			}),
		).toEqual({
			key1: 'value',
		});
	});

	test('It removes empty objects when all cases are combined', () => {
		expect(
			removeEmptyObjects({
				key1: 'value',
				key2: {},
				key3: {
					nested: {
						nested2: {},
					},
				},
				key4: {
					nested: {},
					nested2: 'value',
				},
				key5: [
					{
						nested: {
							deep: {},
						},
					},
					{
						nested: [
							{
								deep: {},
							},
						],
					},
				],
			}),
		).toEqual({
			key1: 'value',
			key4: {
				nested2: 'value',
			},
		});
	});

	test('It does not remove string type values from arrays', () => {
		expect(
			removeEmptyObjects({
				key: ['foo', 'bar'],
				key1: [],
				key2: [{ foo: 'bar' }],
			}),
		).toEqual({
			key: ['foo', 'bar'],
			key2: [{ foo: 'bar' }],
		});
	});

	test('It does not remove nested false or 0 values', () => {
		expect(
			removeEmptyObjects({
				key: {
					nested: {
						nestedArray: [
							[],
							[[]],
							[[{ num: 0 }], [], { bool: false }],
							[[[false]]],
							[{ deep: { deeper: { deepest: undefined } } }],
							0,
							false,
						],
					},
					nested1: {
						deep: {
							bool: false,
						},
					},
					nested2: {
						num: 0,
					},
					nested3: { deep: null },
				},
			}),
		).toEqual({
			key: {
				nested: {
					nestedArray: [
						[[{ num: 0 }], { bool: false }],
						[[[false]]],
						0,
						false,
					],
				},
				nested1: {
					deep: {
						bool: false,
					},
				},
				nested2: {
					num: 0,
				},
			},
		});
	});
});
