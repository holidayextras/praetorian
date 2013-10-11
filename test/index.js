var data = { 
	name: 'kev',
	size: 12,
	weight: 150
};

var structure = {
	'name': {
		'required': true,
		'description': 'Name',
		'validation': {
			'rules': {
				'type': 'string'
			},
			'example': 'Ipsum lorem'
		}
	},
	'size': {
		'required': false,
		'description': 'Actually a size',
		'validation': {
			'rules': {
				'type': 'integer'
			},
			'example': 'Must be an integer e.g. 1'
		}
	},
	'height': {
		'description': 'Actually a height',
		'validation': {
			'rules': {
				'type': 'integer'
			},
			'example': 'Must be an integer e.g. 1'
		}
	},
	'width': {
		'required': true,
		'description': 'Actually a width',
		'validation': {
			'rules': {
				'type': 'integer'
			},
			'example': 'Must be an integer e.g. 1'
		}
	}
};

// fire up Praetorian
var Praetorian = require( '../index' );
praetorian = new Praetorian();

// check shit
praetorian.check( data, structure, function( err, data ) {
		
		if( err ) {
			console.log( 'check err', err );
			praetorian.requirements( structure, function( err, data ) {
				if( err ) {
					console.log( 'requirements err', err );
				} else {
					console.log( 'requirements success', data );		
				}
			} );
		} else {
			console.log( 'check success', data );
		}
} );


// var doormanConfig = require( '../revolver/configs/doorman' );
// var protection = require( '../revolver/libs/utils/doorman' );

// var data = { agent: 'LGD01',
//   adults: '2',
//   children: '2',
//   customerCode: 'T',
//   // location: 'LLW',
//   nights: '1',
//   program: 'WIN',
//   room: 
//    [ { occupancyType: 'QUAD',
//        adults: '2',
//        children: '2',
//        infants: '0' } ],
//   identifier: '123456798',
//   arrivalDate: '2013-10-14',
//   ticketDate: '2013-10-07',
//   _: '1381130377531' };


// var fields = {
// 	'agent': {
// 		'required': true,
// 		'description': 'ABTA number'
// 	},
// 	'adults': {
// 		'required': true,
// 		'description': 'Number of adults in the party',
// 		'validation': doormanConfig.integer
// 	},
// 	'arrivalDate': {
// 		'required': true,
// 		'description': 'Hotel arrival date',
// 		'validation': doormanConfig.date
// 	},
// 	'children': {
// 		'required': false,
// 		'description': 'Number of children in the party',
// 		'validation': doormanConfig.integer
// 	},
// 	'customerCode': {
// 		'required': true,
// 		'description': 'Code signifying the customer code of the query',
// 		'validation': doormanConfig.characterCode(1)
// 	},
// 	'location': {
// 		'required': true,
// 		'description': 'Ticket location code',
// 		'validation': doormanConfig.characterCode(3)
// 	},
// 	'nights': {
// 		'required': true,
// 		'description': 'Number of nights of hotel stay',
// 		'validation': doormanConfig.integer
// 	},
// 	'program': {
// 		'required': true,
// 		'description': 'Hotel program code',
// 		'validation': doormanConfig.threeOrSixCharacterCode
// 	},
// 	'room': {
// 		'required': true,
// 		'OBJECT': {
// 			'adults': {
// 				'required': true,
// 				'description': 'Number of adults in the room',
// 				'validation': doormanConfig.integer
// 			},
// 			'children': {
// 				'description': 'Number of children in the room',
// 				'validation': doormanConfig.integer
// 			},
// 			'occupancyType': {
// 				'required': true,
// 				'description': 'Type of occupancy of the the room',
// 				'validation': doormanConfig.occupancyType
// 			},
// 			'infants': {
// 				'description': 'Number of infants in the room',
// 				'validation': doormanConfig.integer
// 			}
// 		}
// 	},
// 	'identifier': {
// 		'required': true,
// 		'description': 'An identifier'
// 	},
// 	'ticketDate': {
// 		'required': true,
// 		'description': 'Date the ticket is required',
// 		'validation': doormanConfig.date
// 	}
// };

// var start = new Date().getTime();
// var doorman = new protection.Doorman();
// doorman.frisk( data, fields );

// var end = new Date().getTime();

// var diff = end - start;


// console.log( 'doorman.cleanedData', doorman.cleanedData );
