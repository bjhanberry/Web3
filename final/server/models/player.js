var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
	wins: Number,
	losses: Number,
	name: String,
	user: String,
	pass: String
});
var Player = mongoose.model("Player",PlayerSchema);
module.exports = Player;
