
<template>
  <div class="players">
    <h1>Add Player</h1>
      <div class="form">       
        <div>
          <input type="text" placeholder="NAME" v-model="name">
        </div>
        <div>
          <input type="text" placeholder="CREATOR" v-model="user">
        </div>
        
        <div>
          <button class="app_post_btn" @click="addPlayer">Add</button>
        </div>
        
      </div>
  </div>
</template>

<script>
import PlayersService from '@/services/PlayersService'
export default {
  name: 'NewPlayer',
  data () {
    return {
      wins: 0,
      losses: 0,
      name: '',
      user: ''
    }
  },
  methods: {
    async addPlayer () {
      await PlayersService.addPlayer({
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
  background: #02a84d;
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
