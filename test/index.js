// using this to build praetorian...
// fire up Praetorian
var Praetorian = require( '../index' );
praetorian = new Praetorian();

// check shit
praetorian.validate( jsonBefore, schema, function( err, data ) {
		
		// console.log( 'praetorian.errors', praetorian.errors );
		// console.log( 'what came back' );
		// console.log( data.person );
		// console.log( 'what it should be like' );
		// console.log( jsonAfter.person );

		// ensure what comes back looks like it should do
		// if( _.isEqual( data, jsonAfter ) ) {
		// 	console.log( 'CLEAN SUCCESS' );
		// } else {
		// 	console.log( 'CLEAN ERROR' );
		// }


		if( err ) {
			
			console.log( 'check err', err );

			praetorian.requirements( schema, function( err, data ) {

				if( err ) {
					// console.log( 'requirements err', err );
				} else {
					// console.log( 'requirements success', data );		
				}

			} );
		} else {
			// console.log( 'check success', data );
		}
} );