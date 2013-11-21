module.exports = function( configuration ) {
	return {
		"json": {
			"red": "colour", // invalid integer
			"green": 1, // valid integer
			"blue": 1, // invalid string
			"yellow": "colour", // valid string
			"orange": "AB", // too short 3 - 6 character string
			"purple": "ABCDEFG", // too long 3 - 6 character string
			"pink": "ABC", // valid 3 - 6 character string
			"brown": "ABCDEF", // valid 3 - 6 character string
			"maroon": "2013=06=06", // invalid date
			"grey": "ABCDEFGHIJ", // invalid date
			"amber": 20130601, // invalid date
			"ocre": "2013-06-06", // valid date
		},
		"schema": {
			"red": {
				"validation": configuration.integer
			},
			"green": {
				"validation": configuration.integer
			},
			"blue": {
				"validation": configuration.string
			},
			"yellow": {
				"validation": configuration.string
			},
			"orange": {
				"validation": configuration.threeToSixCharacterString( 3, 6 )
			},
			"purple": {
				"validation": configuration.threeToSixCharacterString( 3, 6 )
			},
			"pink": {
				"validation": configuration.threeToSixCharacterString( 3, 6 )
			},
			"brown": {
				"validation": configuration.threeToSixCharacterString( 3, 6 )
			},
			"maroon": {
				"validation": configuration.date
			},
			"grey": {
				"validation": configuration.date
			},
			"amber": {
				"validation": configuration.date
			},
			"ocre": {
				"validation": configuration.date
			}
		}
	}
}