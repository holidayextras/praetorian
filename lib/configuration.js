module.exports = {
	"date": {
		"rules": {
			"type": "date" // use our generic date format YYYY-MM-DD
		},		
		"example": "Must be in the format YYYY-MM-DD e.g. 2018-12-31"
	},
	"threeToSixCharacterString": function( min, max ) {
		return {
			"rules": {
				"type": "string",
				"lengthBetween": {
					"min": min,
					"max": max
				}
			},
			"example": "Must be a " + min + " or " + max + " character string e.g. \"ABC or ABCDEF\""
		}
	},
	"string": {
		"rules": {
			"type": "string"
		},
		"example": "Must be an string e.g. \"hello world\""
	},
	"integer": {
		"rules": {
			"type": "integer"
		},
		"example": "Must be an integer e.g. 1"
	}
}