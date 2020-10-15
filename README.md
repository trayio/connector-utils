# Connector-utils

Common utility functions used in connectors.

## Installation

The `connector-utils` package will be inherently included as part of a new connector scaffold (as part of the Trayio yeoman generator).

When adding the package as part of an existing connector, in your terminal, run:

```
npm i @trayio/connector-utils --save
```

## Basic Usage

To require the package, require as `@trayio/connector-utils`:

```
const utils = require('@trayio/connector-utils')
```

This will give full access to the library. We can then reference utilities such as `UserInputError` by using:

```
utils.error.UserInputError('custom error message')
```

A better usage alternative is to use destructuring, as in the example:

```
const { UserInputError } = require('@trayio/connector-utils').error
```

A full breakdown of available utilities is included in the documentation below.

Please be sure to add any discovered issues or improvement recommendations to the `Issues` tab of this repo.

# Documentation

## Classes

<dl>
<dt><a href="#GenericError">GenericError</a> ⇐ <code>Error</code></dt>
<dd><p>Class representing the base error for all connector errors</p>
</dd>
<dt><a href="#UserInputError">UserInputError</a> ⇐ <code><a href="#GenericError">GenericError</a></code></dt>
<dd><p>Class representing a UserInputError</p>
</dd>
<dt><a href="#ConnectorError">ConnectorError</a> ⇐ <code><a href="#GenericError">GenericError</a></code></dt>
<dd><p>Class representing a ConnectorError</p>
</dd>
<dt><a href="#ApiError">ApiError</a> ⇐ <code><a href="#GenericError">GenericError</a></code></dt>
<dd><p>Class representing a ConnectorError</p>
</dd>
<dt><a href="#OAuthRefresh">OAuthRefresh</a> ⇐ <code><a href="#GenericError">GenericError</a></code></dt>
<dd><p>Class representing a ConnectorError</p>
</dd>
<dt><a href="#NoTriggerError">NoTriggerError</a> ⇐ <code><a href="#GenericError">GenericError</a></code></dt>
<dd><p>Class representing a ConnectorError</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#mustachedDDL">mustachedDDL(object, text, value, isInteger)</a></dt>
<dd><p>Takes value paths as mustached values and returns correct DDL outputs.
A custom flag is in place to allow for keeping integer types for the value key
if required, as mustaching will convert an integer to string.</p>
</dd>
<dt><a href="#DDL">DDL(object, textPath, valuePath)</a></dt>
<dd><p>Takes value paths as explicit strings and returns correct DDL outputs.</p>
</dd>
<dt><a href="#deepMapKeys">deepMapKeys(collection, iteratee)</a></dt>
<dd><p>Maps object keys and formats according to specified casing.</p>
</dd>
<dt><a href="#userInputErrorRejection">userInputErrorRejection(message, body)</a></dt>
<dd><p>Return a User Input Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.</p>
</dd>
<dt><a href="#connectorErrorRejection">connectorErrorRejection(message, body)</a></dt>
<dd><p>Return a Connector Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.</p>
</dd>
<dt><a href="#apiErrorRejection">apiErrorRejection(message, body)</a></dt>
<dd><p>Return a API Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.</p>
</dd>
<dt><a href="#oauthErrorRejection">oauthErrorRejection(message, body)</a></dt>
<dd><p>Return a oAuth Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.</p>
</dd>
<dt><a href="#noTriggerErrorRejection">noTriggerErrorRejection(message, body)</a></dt>
<dd><p>Return a No Trigger Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.</p>
</dd>
<dt><a href="#lookup">lookup(message, [step_settings])</a></dt>
<dd><p>Generates a lookup object for DDL operations.</p>
</dd>
<dt><a href="#removeEmptyObjects">removeEmptyObjects(collection)</a></dt>
<dd><p>Recursively removes empty objects, arrays and strings from a collection.
It&#39;s important to note that this method will remove objects if they become empty
as a result of the nested key/value containing an empty object (the same goes
for arrays).</p>
</dd>
<dt><a href="#removeAuthKeys">removeAuthKeys(collection, additionalKeys)</a></dt>
<dd><p>Removes top levels '#' keys and additional top level keys if supplied.</p>
</dd>
<dt><a href="#validatePaginationRange">validatePaginationRange(value, validation)</a></dt>
<dd><p>Helper for validating user pagination input for a given range.</p>
</dd>
<dt><a href="#generateInputSchema">generateInputSchema({ schema, keys, operation = 'schema' })</a></dt>
<dd><p>Helper for generating an operation input schema.</p>
</dd>
<dt><a href="#formatArrayToDelimitedList">formatArray(arrayToFormat)</a></dt>
<dd><p>Helper to take an array of strings and return a comma-delimited string. Alias of <code><a href="#formatArrayToDelimitedList">formatArrayToDelimitedList({ arrayToFormat, delimiter: ',' })</a></code></p>
</dd>
<dt><a href="#formatArrayToDelimitedList">formatArrayToDelimitedList({ arrayToFormat, [delimiter] })</a></dt>
<dd><p>Helper to take an array of strings and return a string that is a list, delimited by the specified delimiter ('<code>,</code>' by default).</p>
</dd>
</dl>

<a name="GenericError"></a>

## GenericError ⇐ <code>Error</code>

Class representing the base error for all connector errors

**Kind**: global class  
**Extends**: <code>Error</code>  
<a name="UserInputError"></a>

## UserInputError ⇐ [<code>GenericError</code>](#GenericError)

Class representing a UserInputError

**Kind**: global class  
**Extends**: [<code>GenericError</code>](#GenericError)  
<a name="new_UserInputError_new"></a>

### new UserInputError(message, ...errorArgs)

Custom error to throw for issues concerning User Input.

| Param        | Type                | Description                                                                |
| ------------ | ------------------- | -------------------------------------------------------------------------- |
| message      | <code>String</code> | Custom error message to return.                                            |
| ...errorArgs | <code>any</code>    | Error args allowing for extra parameters native to the normal Error class. |

<a name="ConnectorError"></a>

## ConnectorError ⇐ [<code>GenericError</code>](#GenericError)

Class representing a ConnectorError

**Kind**: global class  
**Extends**: [<code>GenericError</code>](#GenericError)  
<a name="new_ConnectorError_new"></a>

### new ConnectorError(message, ...errorArgs)

Custom error to throw for issues concerning the Connector.

| Param        | Type                | Description                                                                |
| ------------ | ------------------- | -------------------------------------------------------------------------- |
| message      | <code>String</code> | Custom error message to return.                                            |
| ...errorArgs | <code>any</code>    | Error args allowing for extra parameters native to the normal Error class. |

<a name="ApiError"></a>

## ApiError ⇐ [<code>GenericError</code>](#GenericError)

Class representing a ConnectorError

**Kind**: global class  
**Extends**: [<code>GenericError</code>](#GenericError)  
<a name="new_ApiError_new"></a>

### new ApiError(message, ...errorArgs)

Custom error to throw for issues concerning the Api;;.

| Param        | Type                | Description                                                                |
| ------------ | ------------------- | -------------------------------------------------------------------------- |
| message      | <code>String</code> | Custom error message to return.                                            |
| ...errorArgs | <code>any</code>    | Error args allowing for extra parameters native to the normal Error class. |

<a name="OAuthRefresh"></a>

## OAuthRefresh ⇐ [<code>GenericError</code>](#GenericError)

Class representing a ConnectorError

**Kind**: global class  
**Extends**: [<code>GenericError</code>](#GenericError)  
<a name="new_OAuthRefresh_new"></a>

### new OAuthRefresh(message, ...errorArgs)

Custom error to throw when an oAuth token has expired.

| Param        | Type                | Description                                                                |
| ------------ | ------------------- | -------------------------------------------------------------------------- |
| message      | <code>String</code> | Custom error message to return.                                            |
| ...errorArgs | <code>any</code>    | Error args allowing for extra parameters native to the normal Error class. |

<a name="NoTriggerError"></a>

## NoTriggerError ⇐ [<code>GenericError</code>](#GenericError)

Class representing a ConnectorError

**Kind**: global class  
**Extends**: [<code>GenericError</code>](#GenericError)  
<a name="new_NoTriggerError_new"></a>

### new NoTriggerError(message, ...errorArgs)

Custom error to throw for issues when a trigger request is ignored.

| Param        | Type                | Description                                                                |
| ------------ | ------------------- | -------------------------------------------------------------------------- |
| message      | <code>String</code> | Custom error message to return.                                            |
| ...errorArgs | <code>any</code>    | Error args allowing for extra parameters native to the normal Error class. |

<a name="mustachedDDL"></a>

## mustachedDDL(arr, text, value, isInteger)

Takes value paths as mustached values and returns correct DDL outputs.
A custom flag is in place to allow for keeping integer types for the value key
if required, as mustaching will convert an integer to string.
If there does not exist a path, the whole result will not return.

**Kind**: global function

| Param     | Type                 | Description                                                                       |
| --------- | -------------------- | --------------------------------------------------------------------------------- |
| arr       | <code>Object</code>  | An array of objects with keys to iterate over and format.                         |
| text      | <code>String</code>  | The path for the required text value.                                             |
| value     | <code>String</code>  | The path for the required value, value.                                           |
| isInteger | <code>Boolean</code> | Flag for whether or not the value field needs to an integer rather than a string. |

<a name="DDL"></a>

## DDL(arr, textPath, valuePath, options)

Takes value paths as explicit strings and returns correct DDL outputs.
If a text value does not exist, the DDL falls back to using the 'value' path.

**Kind**: global function

| Param     | Type                | Description                                               |
| --------- | ------------------- | --------------------------------------------------------- |
| arr       | <code>Object</code> | An array of objects with keys to iterate over and format. |
| textPath  | <code>String</code> | The path for the required text value.                     |
| valuePath | <code>String</code> | The path fot the required value, value.                   |
| options   | <code>String</code> | Options to provide to the DDL                             |

<a name="deepMapKeys"></a>

## deepMapKeys(collection, iteratee)

Maps object keys and formats according to specified casing.

**Kind**: global function

| Param      | Type                  | Description                                                                                                                 |
| ---------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| collection | <code>Object</code>   | The collection with keys to iterate over and format.                                                                        |
| iteratee   | <code>function</code> | The format function used to format keys IE [Lodash](https://lodash.com/docs/4.17.15#camelCase) \_.camelCase('some_string'). |

<a name="userInputErrorRejection"></a>

## userInputErrorRejection(message, body)

Return a User Input Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.

**Kind**: global function

| Param   | Type                | Description                                                   |
| ------- | ------------------- | ------------------------------------------------------------- |
| message | <code>String</code> | The error message to be returned.                             |
| body    | <code>any</code>    | Custom body to be returned when providing more error context. |

<a name="connectorErrorRejection"></a>

## connectorErrorRejection(message, body)

Return a Connector Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.

**Kind**: global function

| Param   | Type                | Description                                                   |
| ------- | ------------------- | ------------------------------------------------------------- |
| message | <code>String</code> | The error message to be returned.                             |
| body    | <code>any</code>    | Custom body to be returned when providing more error context. |

<a name="apiErrorRejection"></a>

## apiErrorRejection(message, body)

Return a API Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.

**Kind**: global function

| Param   | Type                | Description                                                   |
| ------- | ------------------- | ------------------------------------------------------------- |
| message | <code>String</code> | The error message to be returned.                             |
| body    | <code>any</code>    | Custom body to be returned when providing more error context. |

<a name="oauthErrorRejection"></a>

## oauthErrorRejection(message, body)

Return a oAuth Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.

**Kind**: global function

| Param   | Type                | Description                                                   |
| ------- | ------------------- | ------------------------------------------------------------- |
| message | <code>String</code> | The error message to be returned.                             |
| body    | <code>any</code>    | Custom body to be returned when providing more error context. |

<a name="noTriggerErrorRejection"></a>

## noTriggerErrorRejection(message, body)

Return a No Trigger Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.

**Kind**: global function

| Param   | Type                | Description                                                   |
| ------- | ------------------- | ------------------------------------------------------------- |
| message | <code>String</code> | The error message to be returned.                             |
| body    | <code>any</code>    | Custom body to be returned when providing more error context. |

<a name="lookup"></a>

## lookup(message, [step_settings])

Generates a lookup object for DDL operations.

**Kind**: global function

| Param           | Type                | Default         | Description                                                |
| --------------- | ------------------- | --------------- | ---------------------------------------------------------- |
| message         | <code>String</code> |                 | The DDL operation that is run when the lookup is executed. |
| [step_settings] | <code>Object</code> | <code>{}</code> | The custom step settings for the lookup.                   |

<a name="removeEmptyObjects"></a>

## removeEmptyObjects(collection)

Recursively removes empty objects, arrays and strings from a collection.
It's important to note that this method will remove objects if they become empty
as a result of the nested key/value containing an empty object (the same goes
for arrays).

**Kind**: global function

| Param      | Type                | Description                                        |
| ---------- | ------------------- | -------------------------------------------------- |
| collection | <code>Object</code> | The collection from which to remove empty objects. |

<a name="removeAuthKeys"></a>

## removeAuthKeys(collection, additionalKeys)

Removes top levels '#' keys and additional top level keys if supplied.

**Kind**: global function

| Param          | Type                | Description                                                       |
| -------------- | ------------------- | ----------------------------------------------------------------- |
| collection     | <code>Object</code> | The collection to remove '#' keys and additional given keys from. |
| additionalKeys | <code>Array</code>  | An array of additional key names (strings) to remove.             |

<a name="validatePaginationRange"></a>

## validatePaginationRange(value, validation)

Helper for validating user pagination input for a given range.

**Kind**: global function

| Param                | Type                                        | Description                                                  |
| -------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| value                | <code>Integer</code> \| <code>String</code> | The value specified by user input.                           |
| validation           | <code>Object</code>                         | Values relating specifically to the validation requirements. |
| validation.minRange  | <code>Integer</code> \| <code>String</code> | The minimum range specified by the API.                      |
| validation.maxRange  | <code>Integer</code> \| <code>String</code> | The maximum range specified by the API.                      |
| validation.inputName | <code>String</code>                         | The name of the input the range is associated with.          |

<a name="generateInputSchema"></a>

## generateInputSchema({ schema, keys, operation = 'schema', arrayMergeType = 'concatenate' })

Helper for generating an operation input schema.

**Kind**: global function

| Param          | Type                | Description                                                                                                                                                            |
| -------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| schema         | <code>Object</code> | The full connector schema definition.                                                                                                                                  |
| keys           | <code>Object</code> | The keys that you wish to extract from the schema with any override values.                                                                                            |
| operation      | <code>String</code> | The name of the connector operation that you are generating the schema for. This will be used as the root of the object path when logging validation issues. Optional. |
| arrayMergeType | <code>String</code> | The type of merging algorithm to be used for arrays. Possible algorithms are `concatenate` (default), `combineByIndex`, `overwriteByIndex` or `overwrite`. Optional.   |
| returns        | <code>Object</code> | A copy of the requested schema elements.                                                                                                                               |

**Array merge types:**

-   `concatenate` - merge arrays by concatenating values (default)
-   `combineByIndex` - merge/combine arrays by index value
    -   arrays of objects will merge by index (if possible)
    -   other types will concatenate (ignoring value duplication overlap)
-   `overwriteByIndex` - merge/overwrite arrays by index value
    -   arrays of objects will merge by index (if possible)
    -   other types will overwrite by index value
-   `overwrite` - overwrite original array with specified array

Will log to the console if:

-   a requested key does not exist, or
-   `type` or `description` keys are missing, or
-   a `description` does not end in a full stop

Will not log to the console if requested key does not exist, but is overridden with at least a type and description with a full stop.

For more information on how to use the schema generator, please see [schema-generation.md](./schema-generation.md).

**Example**

```js
generateInputSchema({
	operation: 'operationName',
	schema: fullSchema,
	keys: {
		full_schema_key_1: {},
		full_schema_key_2: {},
		full_schema_key_3: {},
	},
	arrayMergeType: 'concatenate',
});
/**
 *	`fullSchema` is the complete schema definition for the connector
 *	`full_schema_key_1` is extracted from the full schema without modification
 *	`full_schema_key_2` is extracted from the full schema without modification
 *	`full_schema_key_3` is extracted from the full schema without modification
 */

generateInputSchema({
	operation: 'operationName',
	schema: fullSchema,
	keys: {
		full_schema_key_1: {},
		full_schema_key_2: {
			required: true,
			description: 'Override key values.',
			default: 'value',
			alias: 'key_2',
		},
		new_key: {
			type: 'string',
			description: 'New date key, not in full schema.',
			format: 'datetime',
			date_mask: 'X',
		},
	},
});
/**
 *	`fullSchema` is the complete schema definition for the connector
 *	`full_schema_key_1` is extracted from the full schema without modification
 *	`full_schema_key_2` is extracted from the full schema and extended/overridden with extra keys and values. The key name will be changed to `key_2' by use of an alias.
 *	`new_key` is not in the full schema but it's full keys and values are supplied
 */
```

<a name="formatArrayToDelimitedList"></a>

## formatArrayToDelimitedList({ arrayToFormat, [delimiter] })

Helper that takes an array and returns a string that is a delimited list of the given array.

Alternatively, you can instead use `formatArray(arrayToFormat)`, which is an alias of `formatArrayToDelimitedList({ arrayToFormat })` and simply uses the default delimiter (`,`).

Using `formatArrayToDelimitedList({ arrayToFormat, [delimiter] })` will allow you to specify an alternative delimiter.

The envisioned use-case is in an operation model to format user array input into a delimited string to assign to a parameter. If it was an optional input and not supplied then the parameter should be `undefined`. This is reflected by the function returning `undefined` if it does not receive an array.

**Kind**: global function

| Param         | Type                | Default        | Description                                                                      |
| ------------- | ------------------- | -------------- | -------------------------------------------------------------------------------- |
| arrayToFormat | <code>Array</code>  |                | Usually an array of Strings, or else equivalent string representations are used. |
| [delimiter]   | <code>String</code> | <code>,</code> | A string that will be used to separate the values.                               |

**Example**:

```js
const inputArray = [1, 2, 'third', 'fourth'];

formatArrayToDelimitedList({ arrayToFormat: inputArray });

// returns '1,2,third,fourth'
```

```js
formatArrayToDelimitedList({ arrayToFormat: undefined });

// returns undefined
```
