/**
* @name /libs/utils/doorman.js
* @description Validates all inputs against a required structure and returns any errors that it finds
* @since Fri Oct 04 12:20:21 BST 2013
* @author Kevin Hodges <kevin.hodges@holidayextras.com>
*/

(function() {
	// get some stuff we need to support our Doorman
	var _, moment;
	_ = require( 'underscore' );
	moment = require( 'moment' );
	exports.frisk = ( function( data, structure, callback ) {

		try {

			console.log( 'Doorman.validate()' );
			console.log( data );
			console.log( structure );


			// ensure data and structure are both objects
			if( !_.isObject( data ) ) {
				throw 'parameter "data" is not an object';
			} 
			if( !_.isObject( structure ) ) {
				throw 'parameter "structure" is not an object';
			} 

			// loop over all data

			// throw "shit happened";

			callback( null, '200' );


		} catch ( e ) {

			callback( e );

		}
	} );
}).call(this);