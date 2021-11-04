
const schema = {
	user: {
		type: "object"
	},
	items: {
		type: "array",
		default: []
	},
	users: {
		type: 'array',
		default: []
	},
	isLoggedIn: {
		type: 'boolean',
		default: false
	}
}


module.exports = schema;