<template>
  <div>
	<nav class="navbar">
		<router-link  tag="li" class-active="active" to="/home">Home</router-link>
		<router-link  tag="li" class-active="active" to="/fight">Fight</router-link>
		<router-link  tag="li" class-active="active" to="/players">Players</router-link>
	</nav>
  </div>
</template>

<style>

nav li{
	display: inline;
	font: Tahoma;
	font-size: 20pt;
	color:antiquewhite;
	background-color: #13219c;
	padding: 5px;
	border-radius:10px;
}
nav li:hover,
   nav li:active{
      background-color: #066406;
      cursor: pointer;
    }
nav li.active{
	background-color:#065000
}
</style>
