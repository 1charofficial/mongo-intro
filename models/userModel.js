
const {Schema, model} = require('mongoose');

let user = new Schema({
	userName: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true, unique: true}
}, {

	toObject: { virtuals: true }

});

module.exports = model(`users`, user);