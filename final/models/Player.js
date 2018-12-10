var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
	wins: Integer,
	losses: Integer,
	name: String,
	user: String
});
var Player = mongoose.model("Player",PlayerSchema);
module.exports = Player;
