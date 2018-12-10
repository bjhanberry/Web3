<template>
  <div class="players">
    <h1>Edit Player</h1>
      <div class="form">        
        <div>
          <input type="text" placeholder="WINS" v-model="wins">
        </div>
        <div>
          <input type="text" placeholder="LOSSES" v-model="losses">
        </div>
        <div>
          <input type="text" placeholder="NAME" v-model="name">
        </div>
        <div>
          <input type="text" placeholder="USER" v-model="user">
        </div>
          <button class="app_post_btn" @click="updatePlayer">Update</button>
        </div>
      </div>
</template>

<script>
import PlayersService from '@/services/PlayersService'
export default {
  name: 'EditPlayer',
  data () {
    return {
      wins: '',
      losses: '',
      name: '',
      user: '',
      pass: ''
    }
  },
  mounted () {
    
  },
  methods: {
    async getPlayers () {
      const response = await PlayersService.fetchPlayers()
      this.players = response.data.players
    },
    async updatePlayer () {
      await PlayersService.updatePlayer({
        id: this.$route.params.id,
        wins: this.wins,
        losses: this.losses,
        name: this.name,
        user: this.user
      })
      this.$router.push({ name: 'Players' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
