// using this to build praetorian...
// fire up Praetorian
var Praetorian = require( '../index' );
praetorian = new Praetorian();

var json = {
	"booking": {
		"elements": {
			"hotels": [
				{
					"arrivalDate": "2014-07-07",
					"rooms": [
						{
							"occupancyType": "QUAD"
						}
					]
				}
			],
			"tickets": [
				{
					"arrivalDate": "2014-09-09",
					"code": "23456"
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
								"type": "string"
							},
							"location": {
								"type": "string",
								"required": true
							},
							"rooms": {
								"type": "array",
								"items": {
									"occupancyType": {
										"type": "string"
									}
								}
							}
						}
					},
					"tickets": {
						"type": "array",
						"items": {
							"code": {
								"type": "integer"
							}
						}
					}
				}
			}
		}
	}
}

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
			console.log( 'data', data.booking.elements );
		}
} );