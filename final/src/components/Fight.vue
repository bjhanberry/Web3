<template>
<div class="fightzone">
		<h2 style="display: inline-block; padding-right: 50px;">P1: {{p1name}}</h2> <h2 style="display: inline-block; padding-left:50px;">P2: {{p2name}} </h2>
	<div class = "fightzone">
		<img class="fightImg" v-bind:src= LimgSrc v-if="player1.name !=undefined"/>
		<img class="fightImg" v-bind:src= RimgSrc v-if="player2.name !=undefined">
	</div>
	<h2 style="display: inline-block; padding-right: 100px;" v-if="p1val != 0">{{p1val}}</h2> <h2 style="display: inline-block; padding-left:100px;" v-if="p2val != 0">{{p2val}} </h2>
	<div>
	<button v-if="(player1.name != undefined) && player2.name != undefined" @click ="computeWinner(player1, player2)">FIGHT</button>
	<h3> {{noteZone}}</h3>
	<input type="checkbox" v-model = "cheat">
	</div>
    <div v-if="players.length > 1" style= "align:center, top">
      <table style="display: inline-block">
				<tr>
					<th>Player 1</th>
				</tr>
        <tr>
          <th>Wins</th>
          <th>Losses</th>
          <th>Name</th>
          <th>Creator</th>
					<th>W/L</th>
          <th width="10" align="center">Action</th>
        </tr>
        <tr v-for="player in players" v-if="player != player2">
          <td>{{ player.wins }}</td>
          <td>{{ player.losses }}</td>
          <td>{{ player.name }}</td>
          <td>{{ player.user }}</td>
					<td>{{(player.wins / player.losses).toPrecision(2)}}
					<td><button @click="selectP1(player)">Select</button></td>
        </tr>
      </table>
      <table style="display: inline-block">
				<tr>
					<th>Player 2</th>
				</tr>
        <tr>
          <th>Wins</th>
          <th>Losses</th>
          <th>Name</th>
          <th>Creator</th>
					<th>W/L</th>
          <th width="10" align="center">Action</th>
        </tr>
        <tr v-for="player in players" v-if="player != player1">
          <td>{{ player.wins }}</td>
          <td>{{ player.losses }}</td>
          <td>{{ player.name }}</td>
          <td>{{ player.user }}</td>
					<td>{{(player.wins / player.losses).toPrecision(2)}}
					<td><button @click="selectP2(player)">Select</button></td>
        </tr>
      </table>
    </div>
    <div v-else>
      Everyone else is dead, add new player <br /><br />
      <router-link v-bind:to="{ name: 'NewPlayer' }" class="add_player_link">Add Player</router-link>
    </div>
</div>
</template>

<script>

import PlayersService from '@/services/PlayersService'
export default {
	name: 'Fight',
	data(){
	
	var player1val, player2val;
	
	return {
			p1val: 0,
			p2val: 0,
			p1name:"",
			p2name:"",
			cheat: false,
			noteZone: "",
			player1: {},
			player2: {},
			players: [],
			LimgSrc: require("./images/knightL.png"),
			RimgSrc: require("./images/knightR.png")
    }
	},
	mounted () {
    this.getPlayers()
  },
  methods:{
		async checkWL(player){
			if (player.losses >=5 && (player.wins / player.losses) < .5){
				if(this.player1 == player) this.p1name ="DEAD";
				else this.p2name = "DEAD"
				this.players.splice( this.players.indexOf(player), 1 );
				this.deletePlayer(player._id);
				player = {};
			  
			}
		},
		async computeWinner(player1,player2){
			this.LimgSrc= require("./images/knightL.png")
			this.RimgSrc= require("./images/knightR.png")
			if(this.cheat) this.p1val = 21;
			else this.p1val = Math.floor((Math.random()*20)+1);
			this.p2val = Math.floor((Math.random()*20)+1);
			if (this.p1val > this.p2val) {
				this.noteZone =  player1.name +" wins!";
				player1.wins++;
				this.updatePlayer1(player1);
				player2.losses++;
				this.updatePlayer2(player2);
				this.checkWL(player2);
				this.RimgSrc= require("./images/knightRdead.png")
			}
			else if (this.p2val > this.p1val) {
				this.noteZone = player2.name +" wins!";
				player1.losses++;
				this.updatePlayer1(player1);
				player2.wins++;
				this.updatePlayer2(player2);
				this.checkWL(player1)
				this.LimgSrc= require("./images/knightLdead.png")

			}
			else this.noteZone = "Draw!";
		},
		async selectP1(player){
			this.player1 = player;
			this.p1name = this.player1.name;
			this.LimgSrc= require("./images/knightL.png")
			this.RimgSrc= require("./images/knightR.png")

		},
		async selectP2(player){
			this.player2 = player;
			this.p2name = this.player2.name;
			this.LimgSrc= require("./images/knightL.png")
			this.RimgSrc= require("./images/knightR.png")
		},
		async getPlayers () {
      const response = await PlayersService.fetchPlayers()
      this.players = response.data.players
    },

    async updatePlayer1 () {
      await PlayersService.updatePlayer({
        id: this.player1._id,
        wins: this.player1.wins,
        losses: this.player1.losses,
        name: this.player1.name,
        user: this.player1.user
      })
		},
		async updatePlayer2 () {
      await PlayersService.updatePlayer({
        id: this.player2._id,
        wins: this.player2.wins,
        losses: this.player2.losses,
        name: this.player2.name,
        user: this.player2.user
      })
		},
	async deletePlayer (id) {
		await PlayersService.deletePlayer(id)
		
	}
  }
}
</script>
<style type="text/css">
.fightImg{
	padding: 25px;
}
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_player_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>