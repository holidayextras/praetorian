/**
* @name /.js
* @description Validates all inputs against a required structure and returns any errors that it finds
* @since Fri Oct 04 12:20:21 BST 2013
* @author Kevin Hodges <kevin.hodges@holidayextras.com>
*/

(function() {
	// get some stuff we need to support Praetorian
	var _, moment;
	_ = require( 'underscore' );
	moment = require( 'moment' );

	var praetorian = function() {};

	// create a shorthand then export the Praetorian object for NodeJS
	exports = module.exports = praetorian;

	// check()
	praetorian.prototype.check = function( data, structure, callback ) {

		// create a private function like this 
		function doStuff() {
			console.log( 'doing stuff' );
		}

		// self.otherFunction();

		try {

			// console.log( 'Praetorian.check()' );
			// console.log( self.data );
			// console.log( self.structure );

			// ensure data and structure are both objects
			if( !_.isObject( data ) ) {
				throw 'parameter "data" is not [object]';
			} 
			if( !_.isObject( structure ) ) {
				throw 'parameter "structure" is not [object]';
			}
			if( !_.isFunction( callback ) ) {
				throw 'parameter "callback" is not [function]';
			}

			// -1. Do we treat the whole thing as a stack? Or reusable "function"
			// 0. benchmark against Doorman for validating a data set against a structure
			// 1. remove all junk data (recursive) keys that dont exist in the structure
			// 2. ensure items that are present (if REQUIRED) and are of the correct type
			// 3. check for ITEMS
			// 4. check for STRUCTURES
			// 5. what happens when we find an OBJECT? i.e. roomInfo on POST book
			// 6. deal with error handling (pass back up stack, modified data)
			// 7. individual validation routines
			// 8. config for Praetorian, build Doorman config in to somewhere but can be overridable :/
			// 9. isValidDate, isNumber etc, can we use Underscore (isFinite)?
			// 10. Identical objects are equal. `0 === -0`, but they aren't identical.
			// 11. better error messageing structure (consolidated)
			// 12. requirements() for outputting errors from a stack
			// 13. figure out what sort of return structures we will provide

			// loop over all data and remove anything that isnt required
			_.each( data, function( data, dataKey ) {
				if( _.isUndefined( structure[dataKey] ) ) {
					// console.log( dataKey + ' is not a needed, data binned' );
					// the key is not required at this level, remove it
					delete data[dataKey];
				} else {
					// so, it's required, validate the value
					// console.log( dataKey + ' is needed, continue parsin' );
				}

			} );

			// check we have all required fields first, that way we can bomb out before entertaining the thought of cleaning up the data
			_.each( structure, function( structure, structureKey ) {
				// console.log( 'structure', structure );
				// console.log( 'structureKey', structureKey );
				// is this field "required"
				if( structure['required'] ) {
					// it is "required", make sure its here
					if( _.isUndefined( data[structureKey] ) ) {
						// BOOO!, #fail
						throw "get yo shit together";
					} else {
						// "required" field is present
					}
					
				} else {
					// "required" is false or undefined, ignore and continue
				}
			} );

			// send the decent data back
			callback( null, data );


		} catch ( err ) {

			// somehow, return the err in the error callback
			if( callback ) {
				callback( err );
			} else {
				return err;
			}

		}

	};

	praetorian.prototype.requirements = function( structure, callback ) {

		try {

			var requirements = {};

			function addRequirement( message, fieldOption ) {
				// returns the field "requirement" details in a consistent structure
				return {
					'example': message,
					'description': fieldOption['description'],
					'required': ( fieldOption['required'] ) ? true : false
				};
			}

			if( !_.isObject( structure ) ) {
				throw 'parameter "structure" is not [object]';
			}
			if( !_.isFunction( callback ) ) {
				throw 'parameter "callback" is not [function]';
			}

			_.each( structure, function( myStructure, structureKey ) {

				var exampleMessage = 'No example given';
				if( typeof myStructure.validation != 'undefined' && typeof myStructure.validation.example != 'undefined') {
					exampleMessage = myStructure.validation.example;
				}
				// add it to the requirements
				requirements[structureKey] = addRequirement( exampleMessage, myStructure );
			} );

			callback( null, requirements );

		} catch ( err ) {
			// somehow, return the err in the error callback
			if( callback ) {
				callback( err );
			} else {
				return err;
			}
		}

	};

})();