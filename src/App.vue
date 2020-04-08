<template>
  <div id="app">
    <keep-alive exclude="Detail"><router-view></router-view></keep-alive>
    <!-- 这样切换组件回来的时候就不会销毁原来组件 -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar/MainTabBar'

export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>

<style>
 @import "assets/css/base.css"
 
</style>


/* 测试git的注释 */
