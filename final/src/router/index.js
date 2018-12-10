import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Fight from '@/components/Fight'
import Players from '@/components/Players'
import NewPlayer from '@/components/NewPlayer'
import EditPlayer from '@/components/EditPlayer'

Vue.use(Router)

export default new Router({
	mode:'history',
  routes: [
    {
		path: '/home',
		name: 'Home',
		component: Home
	},
	{
		path: '/fight',
		name: 'Fight',
		component: Fight
	},
	{
      path: '/players',
      name: 'Players',
      component: Players
	},
	{
	  path: '/players/new',
	  name: 'NewPlayer',
	  component: NewPlayer
	},
	{
	  path: '/players/edit',
	  name: 'EditPlayer',
	  component: EditPlayer
	}
  ]
})
