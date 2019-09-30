const removeEmptyObjects = require('../../lib/removeEmptyObjects');

describe('Helper should remove all empty objects from the payload', () => {
	test('It removes empty objects from top level of object', () => {
		expect(removeEmptyObjects({
			key: 'value',
			key2: 'someval',
			key3: {},
			key4: 'other value',
		}),).toEqual({
			key: 'value',
			key2: 'someval',
			key4: 'other value',
		});
	});

	test('It removes nested empty objects from object', () => {
		expect(removeEmptyObjects({
			key1: 'value',
			key2: {
				nested: {},
				nested2: 'value',
			},
			key3: 'val',
		}),).toEqual({
			key1: 'value',
			key2: {
				nested2: 'value',
			},
			key3: 'val',
		});
	});

	test('It removes objects containing keys with empty values', () => {
		expect(removeEmptyObjects({
			key1: 'value',
			key2: {
				nested: {
					nested2: {},
				},
			},
			key3: 'someval',
		}),).toEqual({
			key1: 'value',
			key3: 'someval',
		});
	});

	test('It removes empty objects from array of objects', () => {
		expect(removeEmptyObjects({
			key1: 'value',
			key2: [
				{
					nested: {
						deep: {}
					},
					nested2: 'value'
				},
				{},
				{
					nested: 'value'
				}
			]
		})).toEqual({
			key1: 'value',
			key2: [
				{
					nested2: 'value',
				},
				{
					nested: 'value'
				}
			]
		});
	});

	test('It removes empty arrays', () => {
		expect(removeEmptyObjects({
			key1: 'value',
			key2: [],
			key3: [
				{
					nested: {}
				},
				{
					nested: {}
				}
			]
		})).toEqual({
			key1: 'value', 
		});
	});

	test('It removes empty objects when all cases are combined', () => {
		expect(removeEmptyObjects({
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
						deep: {}
					},
				},
				{
					nested: [
						{
							deep: {}
						}
					]
				}
			]
		}),).toEqual({
			key1: 'value',
			key4: {
				nested2: 'value',
			},
		});
	});
});