# Praetorian

Praetorian is a structured JSON validator.  Taking JSON data payload and a JSON schema, its primary usage is to ensure the data meets the required specification of said schema.

## Features

* Type validation
* Requirement verification
* Schema prompt generator
* Automatic type conversion
* Multi-lingual support
* Comprehensive documentation

## Philosophy

While there are other JSON schema validators in the wild, often they are complex, unwieldy or require a lot of knowledge upfront.  Praetorian has been designed to be simple to deploy, fast to execute and flexible to support common use cases.

## Installation

```sh
$ npm install praetorian
```

## Schema

### Basic Types

Praetorian supports the following data types "out of the box", `boolean`, `date`, `decimal`, `integer`, `string`.  By defining these in your schema against a JSON key, Praetorian will ensure the value passed in the JSON data is of that type. Types are required.

#### Boolean

```sh
{
  "shield": true
}
```

#### Date

```sh
{
  "shield": "2016-06-30"
}
```

#### Decimal

```sh
{
  "shield": 1.07
}
```

#### Integer

```sh
{
  "shield": 14
}
```

#### String

```sh
{
  "shield": "wooden"
}
```

### Complex Types

Praetorian supports both complex data types `array` and `object`.  Both can be used in a schema recursively.

#### Array

Type `array` needs a JSON key of `items`.  Inside an `array` you can pass more basic or complex types as required.  As with basic types, `array` can have a "required" JSON key.

_Note: when passing JSON data as an `array` type, the "items" structure can be repeated as many times as you need._

```sh
{
  "weapon": {
    "type": "array",
    "required": true,
    "items": {
      "sword": {
        "type": "string"
      },
      "dagger": {
        "type": "string"
      }
    }
  }
}
```

#### Object

Type `object` needs a JSON key of `properties`.  Inside an `object` you can pass more basic or complex types as required.  As with basic types, `object` can have a `required` JSON key.

_Note: unlike with `array`, when passing JSON data as type `object`, the `properties` structure can only be included once._

```sh
{
  "weapon": {
    "type": "object",
    "required": true,
    "properties": {
      "sword": {
        "type": "string"
      },
      "dagger": {
        "type": "string"
      }
    }
  }
}
```

### Requireds

To mark a JSON key as a required field simply do the following:

```sh
{
  "shield": {
    "required": true
  }
}
```
To pass validation of a schema with a `required` property, the supplied JSON data must have this field present and correct
_Note: if the field is not required, you can set `"required": false` or simply remove the property entirely._

### Data "cleaning"

During the `praetorian.validate()` call, any data that is not recognised by the schema will be removed from the result.

## Example 1

Using an `array` type.  With the following example notice in the result, the key `location` on the second object in the `senators` array has been stripped out of the "result".  As it doesn't form part of the schema, Praetorian removes this property.

_Schema_
```sh
{
  "senators": {
    "type": "array",
    "items": {
      "name": {
        "type": "string"
      },
      "age": {
        "type": "integer"
      }
    }
  }
}
```

_JSON_
```sh
{
  "senators": [
    {
      "name": "Graccus",
      "age": 68
    },
    {
      "name": "Quintus",
      "age": 56,
      "location": "Rome"
    }
  ]
}
```

_Result_
```sh
{
  "senators": [
    {
      "name": "Graccus",
      "age": 68
    },
    {
      "name": "Quintus",
      "age": 56
    }
  ]
}
```

## Usage

To include Praetorian in your project and get underway, use the following snippet.

```sh
var Praetorian = require( 'praetorian' );
praetorian = new Praetorian( options );

// pass your data and structure in like this
praetorian.validate( json, schema, function( err, result ) {
  if( err ) {
    // in the instance of a schema validation error, requirements will tell you for the passed schema
    // how to fulfill the specification
    praetorian.requirements( schema, function( err, result ) {
      if( err ) {
        // requirements errored
      } else {
        // requirements "result" drop out here
      }
    } );
  } else {
    // clean data "result" drops out here
  }
} );
```

## Options

Options can be passed into the Praetorian constructor to modify the default behaviour like this:

```sh
var Praetorian = require( 'praetorian' );
praetorian = new Praetorian(
  {
    automaticTypeConversion: false,
    language: "es"
  }
);
```

### - Automatic type conversion

By default `automaticTypeConversion` is set to `true`.  When `praetorian.validate()` is called, where "types" are specified in your schema, Praetorian will attempt to convert an obvious types to their native.  To turn this off, set it to `false`.

__How?__
```sh
{
  automaticTypeConversion: false
}
```

__Schema__
```sh
{
  "hasHorse": {
    "type": "boolean"
  }
}
```

__JSON__
```sh
{
  "hasHorse": "true"
}
```

__Result__
```sh
{
  "hasHorse": true
}
```

### - Language

By default `language` is set to `en` (English).  When `.validate()` or `.requirements()` is called, any messages returned will be in the requested language.  Supported languages can be found in the `lib/internationalisation` folder.

_Note: `description` keys will be returned from the schema as they are passed in._

__How?__
```sh
{
  language: "es"
}
```

__Schema__
```sh
{
  "hasHorse": {
    "type": "boolean",
    "description": "Does this senator have a horse?"
  }
}
```

__JSON__
```sh
{
  "hasHorse": "notABoolean"
}
```

__Result__
```sh
{
  "hasHorse": {
    "example": "debe ser un valor booleano e.g. verdad",
    "description": "Does this senator have a horse?",
    "required": false
  }
}
```

## Testing

To run the test harness change to the praetorian directory:
```sh
cd praetorian
```

and run the tests:
```sh
node test/sanity.js
```

## License

(The [MIT](http://en.wikipedia.org/wiki/MIT_License "MIT") License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.