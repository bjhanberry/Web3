const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var Player = require("../models/player");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/players');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

// Fetch all players
app.get('/players', (req, res) => {
  Player.find({}, 'title description wins losses name user', function (error, players) {
    if (error) { console.error(error); }
    res.send({
      players: players
    })
  }).sort({_id:-1})
})

// Add new player
app.post('/players', (req, res) => {
  var db = req.db;
  var wins = req.body.wins;
  var losses = req.body.losses;
  var name = req.body.name;
  var user = req.body.user;
  
  var new_player = new Player({
    wins: wins,
	  losses: losses,
  	name: name,
    user: user
  })

  new_player.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Player saved successfully!'
    })
  })
})

// Fetch single player
app.get('/player/:id', (req, res) => {
  var db = req.db;
  Player.findById(req.params.id, 'title description wins losses name user', function (error, player) {
    if (error) { console.error(error); }
    res.send(player)
  })
})

// Update a player
app.put('/players/:id', (req, res) => {
  var db = req.db;
  Player.findById(req.params.id, 'title description wins losses name user', function (error, player) {
    if (error) { console.error(error); }

    player.wins = req.body.wins
    player.losses = req.body.losses
    player.name = req.body.name
    player.user = req.body.user
    player.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})
// Delete a player
app.delete('/players/:id', (req, res) => {
  var db = req.db;
  Player.remove({
    _id: req.params.id
  }, function(err, player){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})
app.listen(process.env.PORT || 8081)
