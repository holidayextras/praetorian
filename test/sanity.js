// get praetorian (so we can test it)
var Praetorian = require( '../index' );
praetorian = new Praetorian();

// and some testing stuff...
var vows = require( 'vows' ),
		assert = require( 'assert' );

// var validationRoutines = {
// 	threeToSixCharacterString: {
// 		'rules': {
// 			'type': 'string',
// 			'length': {
// 				'min': 3,
// 				'max': 6
// 			},
// 		},
// 		'example': 'Must be a 3 or 6 character string e.g. "ABC or ABCDEF"'
// 	},
// 	string: {
// 		'rules': {
// 			'type': 'string'
// 		},
// 		'example': 'Must be an string e.g. "hello world"'
// 	},
// 	integer: {
// 		'rules': {
// 			'type': 'integer'
// 		},
// 		'example': 'Must be an integer e.g. 1'
// 	}
// }

vows.describe( 'praetorian' ).addBatch( {

		'frisk basic JSON': {
			topic: function() {
				// imagine up some data and a schema it should validate against
				var json = { 
					model: 'Ford',
					car: [
						{
							colour: 'red',
							seats: {
								remove: true,
								front: 2
							},
							removeArray: [
							],
							removeObject: {
							}
						}
					],
					removeArray: [
					],
					removeObject: {
					},
					trailer: {
						size: 3,
						remove: 7,
						removeArray: [
						],
						removeObject: {							
						}
					}
				};

				var schema = {
					model: {
						required: true,
						description: 'Car model',
						type: 'string'
					},
					car: {
						required: true,
						type: 'array',
						properties: {
							colour: {
								required: true,
								description: 'A colour',
								type: 'string'
							},
							seats: {
								required: true,
								type: 'object',
								description: 'Breakdown of seats',
								properties: {
									front: {
										required: true,
										description: 'Number of seats in the front',
										type: 'integer'
									}
								}
							}
						}
					},
					trailer: {
						required: true,
						type: 'object',
						properties: {
							size: {
								required: true,
								type: 'integer',
								description: 'Length of trailer',
							}
						}
					}
				};

				// fire the call
				praetorian.validate( json, schema, this.callback );
			},
			'execute frisk basic JSON': function( err, result ) {

				// errors thrown by praetorian will be handled and return an err, to pass the value should be null				
				assert.isNull( err );

				// check the response isn't null either
				assert.isNotNull( result );

				// must be an object too
				assert.isObject( result );

				// now check that the result json (cleaned data) is EXACTLY what we expect it to be
				var expected = { 
					model: 'Ford',
					car: [
						{
							colour: 'red',
							seats: {
								front: 2
							}
						}
					],
					trailer: {
						size: 3
					}
				};

				assert.deepEqual( result, expected );

			}			
		}
} ).run();