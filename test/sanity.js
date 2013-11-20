// get praetorian (so we can test it)
var Praetorian = require( '../index' );
praetorian = new Praetorian( { debug: true } );

// and some testing stuff...
var vows = require( 'vows' ),
		assert = require( 'assert' );
		
// Data sanitising: this should strip out all invalid properties
var quintus = require( './json/quintus' );
// Data verification: ensures you have passed everything required, note we're not 
// doing any type checking or validation here
// do note though, this test should pass with all "requirements" met
var graccus = require( './json/graccus' );
// Data verification: all these tests should error, we need to ensure the correct number are caught
// var another = require( '' );


vows.describe( 'praetorian' ).addBatch( {

		// 'quintus': {
		// 	topic: function() {
		// 		// fire the call
		// 		praetorian.validate( quintus.json, quintus.schema, this.callback );
		// 	},
		// 	'execute quintus': function( err, result ) {

		// 		// errors thrown by praetorian will be handled and return an err, to pass the value should be null				
		// 		assert.isNull( err );

		// 		// check the response isn't null either
		// 		assert.isNotNull( result );

		// 		// must be an object too
		// 		assert.isObject( result );

		// 		// now check that the result json (cleaned data) is EXACTLY what we expect it to be
		// 		assert.deepEqual( result, quintus.expected );

		// 	}			
		// },

		'graccus': {
			topic: function() {
				// fire the call
				praetorian.validate( graccus.json, graccus.schema, this.callback );
			},
			'execute graccus': function( err, result ) {

				console.log( 'graccus result', result );
				if( err ) {
					console.log( 'err', err );
				}

				// errors thrown by praetorian will be handled and return an err, to pass the value should be null				
				assert.isNull( err );

				// check the response isn't null either
				assert.isNotNull( result );

				// must be an object too
				assert.isObject( result );

				// now check that the result json (cleaned data) is EXACTLY what we expect it to be
				assert.deepEqual( result, graccus.expected );

			}			
		}

} ).run();