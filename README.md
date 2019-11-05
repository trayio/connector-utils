# Connector-utils
Common utility functions used in connectors.

## Usage

TODO: add usage guide

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


| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | Custom error message to return. |
| ...errorArgs | <code>any</code> | Error args allowing for extra parameters native to the normal Error class. |

<a name="ConnectorError"></a>

## ConnectorError ⇐ [<code>GenericError</code>](#GenericError)
Class representing a ConnectorError

**Kind**: global class  
**Extends**: [<code>GenericError</code>](#GenericError)  
<a name="new_ConnectorError_new"></a>

### new ConnectorError(message, ...errorArgs)
Custom error to throw for issues concerning the Connector.


| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | Custom error message to return. |
| ...errorArgs | <code>any</code> | Error args allowing for extra parameters native to the normal Error class. |

<a name="ApiError"></a>

## ApiError ⇐ [<code>GenericError</code>](#GenericError)
Class representing a ConnectorError

**Kind**: global class  
**Extends**: [<code>GenericError</code>](#GenericError)  
<a name="new_ApiError_new"></a>

### new ApiError(message, ...errorArgs)
Custom error to throw for issues concerning the Api;;.


| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | Custom error message to return. |
| ...errorArgs | <code>any</code> | Error args allowing for extra parameters native to the normal Error class. |

<a name="OAuthRefresh"></a>

## OAuthRefresh ⇐ [<code>GenericError</code>](#GenericError)
Class representing a ConnectorError

**Kind**: global class  
**Extends**: [<code>GenericError</code>](#GenericError)  
<a name="new_OAuthRefresh_new"></a>

### new OAuthRefresh(message, ...errorArgs)
Custom error to throw when an oAuth token has expired.


| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | Custom error message to return. |
| ...errorArgs | <code>any</code> | Error args allowing for extra parameters native to the normal Error class. |

<a name="NoTriggerError"></a>

## NoTriggerError ⇐ [<code>GenericError</code>](#GenericError)
Class representing a ConnectorError

**Kind**: global class  
**Extends**: [<code>GenericError</code>](#GenericError)  
<a name="new_NoTriggerError_new"></a>

### new NoTriggerError(message, ...errorArgs)
Custom error to throw for issues when a trigger request is ignored.


| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | Custom error message to return. |
| ...errorArgs | <code>any</code> | Error args allowing for extra parameters native to the normal Error class. |

<a name="mustachedDDL"></a>

## mustachedDDL(object, text, value, isInteger)
Takes value paths as mustached values and returns correct DDL outputs.
A custom flag is in place to allow for keeping integer types for the value key
if required, as mustaching will convert an integer to string.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>Object</code> |  | The collection with keys to iterate over and format. |
| text | <code>String</code> |  | The path for the required text value. |
| value | <code>String</code> |  | The path for the required value, value. |
| isInteger | <code>Boolean</code> | <code>false</code> | Flag for whether or not the value field needs to an integer rather than a string. |

<a name="DDL"></a>

## DDL(object, textPath, valuePath)
Takes value paths as explicit strings and returns correct DDL outputs.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The collection with keys to iterate over and format. |
| textPath | <code>String</code> | The path for the required text value. |
| valuePath | <code>String</code> | The path fot the required value, value. |

<a name="deepMapKeys"></a>

## deepMapKeys(collection, iteratee)
Maps object keys and formats according to specified casing.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Object</code> | The collection with keys to iterate over and format. |
| iteratee | <code>function</code> | The format function used to format keys IE [Lodash](https://lodash.com/docs/4.17.15#camelCase) _.camelCase('some_string'). |

<a name="userInputErrorRejection"></a>

## userInputErrorRejection(message, body)
Return a User Input Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The error message to be returned. |
| body | <code>any</code> | Custom body to be returned when providing more error context. |

<a name="connectorErrorRejection"></a>

## connectorErrorRejection(message, body)
Return a Connector Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The error message to be returned. |
| body | <code>any</code> | Custom body to be returned when providing more error context. |

<a name="apiErrorRejection"></a>

## apiErrorRejection(message, body)
Return a API Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The error message to be returned. |
| body | <code>any</code> | Custom body to be returned when providing more error context. |

<a name="oauthErrorRejection"></a>

## oauthErrorRejection(message, body)
Return a oAuth Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The error message to be returned. |
| body | <code>any</code> | Custom body to be returned when providing more error context. |

<a name="noTriggerErrorRejection"></a>

## noTriggerErrorRejection(message, body)
Return a No Trigger Error with option to pass a body argument.
The use case for this over the custom Error class is to pass a body to provide error context.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The error message to be returned. |
| body | <code>any</code> | Custom body to be returned when providing more error context. |

<a name="lookup"></a>

## lookup(message, [step_settings])
Generates a lookup object for DDL operations.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>String</code> |  | The DDL operation that is run when the lookup is executed. |
| [step_settings] | <code>Object</code> | <code>{}</code> | The custom step settings for the lookup. |

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