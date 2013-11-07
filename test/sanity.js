// get praetorian (so we can test it)
var Praetorian = require( '../index' );
praetorian = new Praetorian();

// and some testing stuff...
var vows = require( 'vows' ),
		assert = require( 'assert' ),
		test = require( './test' );

vows.describe( 'praetorian' ).addBatch( {

		'quintus': {
			topic: function() {
				// fire the call
				praetorian.validate( test.quintusJson, test.quintusSchema, this.callback );
			},
			'execute quintus': function( err, result ) {

				// errors thrown by praetorian will be handled and return an err, to pass the value should be null				
				assert.isNull( err );

				// check the response isn't null either
				assert.isNotNull( result );

				// must be an object too
				assert.isObject( result );

				// now check that the result json (cleaned data) is EXACTLY what we expect it to be
				assert.deepEqual( result, test.quintusExpected );

			}			
		}
} ).run();