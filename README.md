Praetorian
==

Praetorian is a structured JSON validator.  It take both a JSON data set and a structure and tells you if anything, whats wrong with it.

Version
--

0.0.2 (in development)

Installation
--
```sh
$ npm install praetorian
```
Schema
--
Example:
```sh
{
    "shield": {
        "required": true
        "validation": {

        }
    },
    "weapon": {
        "required": true
        "type": "array",
        "items": {
            "sword": {
                "validation": {

                }
            },
            "dagger": {
                "required": true
            }
        }
    },
    "helmet": {
        "type": "object",
        "properties": {
            "noseGuard": {
                "required": true
            },
            "chinStrap": {

            }
        }
    }
}
```
Notes:
* By specifying "type", Praetorian will automatically cast values
* Objects have "properties"
* Arrays have "items"
* Validation configuration should be used to ensure any type dependencies are met

Usage
--
```sh
var Praetorian = require( '../index' );
praetorian = new Praetorian();

// pass your data and structure in like this
praetorian.validate( data, structure, function( err, data ) {
    if( err ) {
        console.log( 'check err', err );
        // requirements will tell you for the passed structure
        // how to fulfill the validation
        praetorian.requirements( structure, function( err, data ) {
            if( err ) {
                // console.log( 'requirements err', err );
            } else {
                // console.log( 'requirements success', data );		
            }
        } );
    } else {
        console.log( 'check success', data );
    }
} );
```

Testing
--

To run the test harness do the following:
```sh
cd praetorian
node test/sanity.js
```
License
--
[MIT](http://en.wikipedia.org/wiki/MIT_License "MIT")