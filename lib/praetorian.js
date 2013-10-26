/**
* @name /.js
* @description Validates all inputs against a required structure and returns any errors that it finds
* @since Fri Oct 04 12:20:21 BST 2013
* @author Kevin Hodges <kevin.hodges@holidayextras.com>
*/

(function() {
	// get some stuff we need to support Praetorian
	var _ = require( 'underscore' ), moment = require( 'moment' );
	var praetorian = function() {};

	// create a shorthand then export the Praetorian object for NodeJS
	exports = module.exports = praetorian;

	praetorian.prototype.validate = function( data, structure, callback ) {

		var errors = [];

		// little closure to manage rule adherence
		var rules = function( data ) {
			// state for lifetime of the rules call (rules are chainable)
			var check = {
				data: data == null || ( isNaN( data ) && data.length == undefined ) ? '' : data,
				error: null
			}

			return {
				isString: function() {
					console.log( 'isString() on ', check.data );
					if( !_.isString( check.data ) ) {
						check.error = 'Not a string';
					}
					return this;
				},
				isInteger: function() {
					console.log( 'isInteger() on ', check.data );
					if( !_.isNumber( check.data ) ) {
						check.error = 'Not a number';
					}
					return this;
				},
				execute: function( callback ) {
					callback( check.error );
				}
			};
		}

		try {

			// ensure data and structure are both objects
			if( !_.isObject( data ) ) {
				throw new TypeError( 'parameter "data" is not [object]' );
			} 
			if( !_.isObject( structure ) ) {
				throw new TypeError( 'parameter "structure" is not [object]' );
			}
			if( !_.isFunction( callback ) ) {
				throw new TypeError( 'parameter "callback" is not [function]' );
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
				} else if( ( !_.isUndefined( structure[dataKey].validation ) ) && ( !_.isUndefined( structure[dataKey].validation.rules ) ) ) {
					// loop each rule
					_.each( structure[dataKey].validation.rules, function( rule ) {

						var validator = new rules( data );
						switch( rule )  {
							case 'string':
								validator.isString();
								break;

							case 'integer':
								validator.isInteger();
								break;

							case 'stringInteger':
								validator.isString().isInteger();
								break;

						}

						// maybe assign these to Praetorian?
						validator.execute( function( err ) {
							if( err ){
								errors.push( dataKey + ': ' + err );
							}
						} );
					} );

				} else {
					// "required" but no validation prescribed, i'd call that "done"
				}

			} );

			// check we have all required fields
			// _.each( structure, function( structure, structureKey ) {
			// 	// is this field "required"
			// 	if( ( structure['required'] ) && ( _.isUndefined( data[structureKey] ) ) ) {
			// 		// BOOO!, #fail
			// 		throw "get yo shit together";	
			// 	} else {
			// 		// "required" is false or undefined, ignore and continue
			// 	}
			// } );

			if( errors.length > 0 ) {
				// send the errors back
				callback( errors );
			} else {
				// send the decent data back
				callback( null, data );	
			}
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

			var results = [];
    	if( structure == null ) return results;

			function addRequirement( message, field ) {
				// returns the field "requirement" details in a consistent structure
				return {
					'example': message,
					'description': field['description'],
					'required': ( field['required'] ) ? true : false
				};
			}

			if( !_.isObject( structure ) ) {
				throw new TypeError( 'parameter "structure" is not [object]' );
			}
			if( !_.isFunction( callback ) ) {
				throw new TypeError( 'parameter "callback" is not [function]' );
			}

			_.each( structure, function( field, fieldKey ) {
				// add some details to the requirements
				results[fieldKey] = addRequirement( ( field.validation && field.validation.example ) ? field.validation.example : 'No example given', field );
			} );

			callback( null, results );

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