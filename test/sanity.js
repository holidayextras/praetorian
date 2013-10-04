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
					size: 12
				};

				var structure = {
					'agent': {
						'required': true,
						'description': 'Name',
						'validation': 'string'
					},
					'size': {
						'description': 'Actually a length',
						'validation': 'number'
					}
				};

				// fire the frisk call
				praetorian.frisk( data, structure, this.callback );
			},
			'execute frisk basic JSON': function( err, result ) {

				// errors thrown by praetorian will be handled and return an err, to pass the value should be null				
				assert.isNull( err );

				// check the response isn't null either
				assert.isNotNull( result );

			}			
		}
} ).run();