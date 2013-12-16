// using this to build praetorian...
// fire up Praetorian
var Praetorian = require( '../index' );
// as second parameter, pass in custom rules
// I can only use the built in "rules" so we would need to write those ourselves and accept pull requests to the core
// would be nice to be able to add custom rules so its fully customisable...
praetorian = new Praetorian(
	{
		"language": "en"
	},
	{
		"myCompoundValidator": {
			"rules": {
				"minLength": 3,
				"maxLength": 6
			},
			"example": "Must between 3 and 6 characters e.g. ABCD"	
		}	
	}
);

var json = {
	"foo": "ABCDEFG",
	"bar": "AB",
	"baz": "ABCD"
}

var schema = {
	"foo": {
		"type": "string",
		"validation": "myCompoundValidator",
		"required": true
	},
	"bar": {
		"type": "string",
		"validation": "myCompoundValidator"
	},
	"baz": {
		"type": "string",
		"validation": "myCompoundValidator"
	},
	"jon": {
		"type": "string"
	}
}

// var json = {
// 	"hey": "2014-07-22"
// }

// var schema = {
// 	"hey": {
// 		"type": "date"
// 	}
// }

// check shit
praetorian.validate( json, schema, function( err, data ) {

		if( err ) {
			
			console.log( 'check err', err );

			praetorian.requirements( schema, function( err, data ) {

				if( err ) {
					console.log( 'requirements err', err );
				} else {
					console.log( 'requirements success', data );		
				}

			} );
		} else {
			// console.log( 'check success', data );
			console.log( 'data', data );
		}
} );