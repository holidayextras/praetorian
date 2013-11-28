// using this to build praetorian...
// fire up Praetorian
var Praetorian = require( '../index' );
praetorian = new Praetorian(
	{
		"language": "es"
	}
);

var json = {
	"booking": {
		"elements": {
			"hotels": [
				{
					"arrivalDate": "2014-30-07",
					"location": "ABC",
					"age1": "gray",
					"age2": 1,
					"age3": "1",
					"age4": "true",
					"age5": true,
					"height": "gray",
					"width": "0.01",
					"shape": 0.01
				}
			],
			"tickets": [
				{
					"arrivalDate": "2014-09-09",
					"code1": "23456",
					"code2": 23456,
					"code3": "test"
				}
			]
		}
	}
}


var schema = {
	"booking": {
		"type": "object",
		"description": "A freaking booking",
		"required": true,
		"properties": {
			"elements": {
				"type": "object",
				"properties": {
					"hotels": {
						"type": "array",
						"items": {
							"arrivalDate": {
								"type": "date"
							},
							"location": {
								"type": "string",
								"required": true
							},
							"age1": {
								"type": "boolean"
							},
							"age2": {
								"type": "boolean",
								"description": "Second age"
							},
							"age3": {
								"type": "boolean"
							},
							"age4": {
								"type": "boolean"
							},
							"age5": {
								"type": "boolean"
							},
							"height": {
								"type": "decimal"
							},
							"width": {
								"type": "decimal"
							},
							"shape": {
								"type": "decimal"
							}
						}
					},
					"tickets": {
						"type": "array",
						"items": {
							"code1": {
								"type": "integer"
							},
							"code2": {
								"type": "integer"
							},
							"code3": {
								"type": "integer"
							},
							"arrivalDate": {
								"type": "date"
							}
						}
					}
				}
			}
		}
	}
}

var json3 = {
  "hasHorse": "notABlloean"
}

var schema3 = {
  "hasHorse": {
    "type": "boolean"
  }
}

// check shit
praetorian.validate( json3, schema3, function( err, data ) {

		if( err ) {
			
			console.log( 'check err', err );

			praetorian.requirements( schema3, function( err, data ) {

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