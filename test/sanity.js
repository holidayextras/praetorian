// get praetorian (so we can test it)
var praetorian = require( '../lib/praetorian' );
// and some testing stuff...
var vows = require( 'vows' ),
		assert = require( 'assert' );

vows.describe( 'praetorian' ).addBatch( {

		'frisk basic JSON': {
			topic: function() {
				// imagine up some data and a structure that should validate it
				var data ={ 
					name: 'kev',
					size: 12,
					weight: 150
				};

				// var structure = {
				// 	'name': {
				// 		'required': true,
				// 		'description': 'Name',
				// 		'validation': 'string'
				// 	},
				// 	'size': {
				// 		'description': 'Actually a length',
				// 		'validation': 'integer'
				// 	}
				// };

				var json = {
					arrivalDate: {
						required: true,
						description: 'Hotel arrival date',
						type: 'STRING'
					},
					person: {
						required: true,
						type: 'ARRAY',
						properties: {
							adults: {
								required: true,
								description: 'Number of adults in the room',
								type: 'INTEGER'
							},
							rooms: {
								required: true,
								type: 'OBJECT',
								description: 'Number of children in the room',
								properties: {
									children: {
										required: true,
										description: 'Number of adults in the room',
										type: 'INTEGER'
									}
								}
							}
						}
					}
				}

				// fire the call
				praetorian.validate( data, structure, this.callback );
			},
			'execute frisk basic JSON': function( err, result ) {

				// errors thrown by praetorian will be handled and return an err, to pass the value should be null				
				assert.isNull( err );

				// check the response isn't null either
				assert.isNotNull( result );

				// must be an object too
				assert.isObject( result );

			}			
		}
} ).run();