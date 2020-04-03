<template>
  <div id="home">
      <Nav-Bar class="home-navbar"><div slot="center">首页</div></Nav-Bar>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
export default {
  components:{
    NavBar
  }
}
</script>

<style>
.home-navbar{
  background-color:var(--color-tint);
  color: #ffffff;
}
</style>