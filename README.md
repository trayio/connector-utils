# Connector-utils
Common utility functions used in connectors.

## Classes

<dl>
<dt><a href="#UserInputError">UserInputError</a></dt>
<dd></dd>
<dt><a href="#ConnectorError">ConnectorError</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#mustached">mustached(object, text, value, integer)</a></dt>
<dd><p>Takes value paths as mustached values and returns correct DDL outputs.
A custom flag is in place to allow for keeping integer types for the value key
if required, as mustaching will convert an integer to string.</p>
</dd>
<dt><a href="#standard">standard(object, textPath, valuePath)</a></dt>
<dd><p>Takes value paths as explicit strings and returns correct DDL outputs.</p>
</dd>
<dt><a href="#lookup">lookup(message, [step_settings])</a></dt>
<dd><p>Generates a lookup object for DDL operations.</p>
</dd>
<dt><a href="#mapKeys">mapKeys(collection, iteratee)</a></dt>
<dd><p>Maps object keys and formats according to specified casing.</p>
</dd>
<dt><a href="#removeEmptyObjects">removeEmptyObjects(collection)</a></dt>
<dd><p>Recursively removes empty objects, arrays and strings from a collection.
It&#39;s important to note that this method will remove objects if they become empty
as a result of the nested key/value containing an empty object (the same goes
for arrays).</p>
</dd>
<dt><a href="#xmlFormatter">xmlFormatter(rawObject, treatAsArray, [startAcc])</a></dt>
<dd><p>Recursively iterate through output from xml2js library to remove unneeded properties and
force objects to arrays. Function takes the object to iterate through, an array of property names to convert to arrays
and a counter keep track of how many levels of the nested structure iterated through.</p>
</dd>
</dl>

<a name="UserInputError"></a>

## UserInputError
**Kind**: custom error class  
<a name="new_UserInputError_new"></a>

### new UserInputError(message, [code], ...params)
Custom error to throw for issues concerning User Input.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>String</code> |  | Custom error message to return. |
| [code] | <code>String</code> | <code>&#x27;#user_input_error&#x27;</code> | A hard coded error code for this error. |
| ...params | <code>any</code> |  | Params allowing for further error context. |

<a name="ConnectorError"></a>

## ConnectorError
**Kind**: custom error class  
<a name="new_ConnectorError_new"></a>

### new ConnectorError(message, [code], ...params)
Custom error to throw for issues concerning the Connector.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>String</code> |  | Custom error message to return. |
| [code] | <code>String</code> | <code>&#x27;#connector_error&#x27;</code> | A hard coded error code for this error. |
| ...params | <code>any</code> |  | Params allowing for further error context. |

<a name="mustached"></a>

## mustached(object, text, value, integer)
Takes value paths as mustached values and returns correct DDL outputs.
A custom flag is in place to allow for keeping integer types for the value key
if required, as mustaching will convert an integer to string.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>Object</code> |  | The collection with keys to iterate over and format. |
| text | <code>String</code> |  | The path for the required text value. |
| value | <code>String</code> |  | The path fot the required value, value. |
| integer | <code>Boolean</code> | <code>false</code> | Flag for whether or not the value field needs to an integer rather than a string. |

<a name="standard"></a>

## standard(object, textPath, valuePath)
Takes value paths as explicit strings and returns correct DDL outputs.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The collection with keys to iterate over and format. |
| textPath | <code>String</code> | The path for the required text value. |
| valuePath | <code>String</code> | The path fot the required value, value. |

<a name="lookup"></a>

## lookup(message, [step_settings])
Generates a lookup object for DDL operations.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>String</code> |  | The DDL operation that is run when the lookup is executed. |
| [step_settings] | <code>Object</code> | <code>{}</code> | The custom step settings for the lookup. |

<a name="mapKeys"></a>

## mapKeys(collection, iteratee)
Maps object keys and formats according to specified casing.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Object</code> | The collection with keys to iterate over and format. |
| iteratee | <code>function</code> | The format function used to format keys. |

<a name="removeEmptyObjects"></a>

## removeEmptyObjects(collection)
Recursively removes empty objects, arrays and strings from a collection.
It's important to note that this method will remove objects if they become empty
as a result of the nested key/value containing an empty object (the same goes
for arrays).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Object</code> | The collection from which to remove empty objects. |

<a name="xmlFormatter"></a>

## xmlFormatter(rawObject, treatAsArray, [startAcc])
Recursively iterate through output from xml2js library to remove unneeded properties and
force objects to arrays. Function takes the object to iterate through, an array of property names to convert to arrays
and a counter keep track of how many levels of the nested structure iterated through.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rawObject | <code>Object</code> |  | The collection with keys to iterate over and format. |
| treatAsArray | <code>Array.&lt;String&gt;</code> |  | A single string or collection of strings, that represent keys to treat as arrays. |
| [startAcc] | <code>Object</code> | <code>{}</code> | A custom accumulator for the method to use. |