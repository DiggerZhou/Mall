<template>
  <div id="app">
    <keep-alive exclude="Detail"><router-view></router-view></keep-alive>
    <!-- 这样切换组件回来的时候就不会销毁原来组件 -->
    <main-tab-bar></main-tab-bar>
    <Icon></Icon>
    <SvgIcon></SvgIcon>
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar/MainTabBar'
import Icon from 'components/content/Icon/Icon'
import SvgIcon from 'components/content/Icon/svg'

export default {
  name: 'App',
  components:{
    MainTabBar,
    Icon,
    SvgIcon
  }
}
</script>

<style>
 @import "assets/css/base.css"
 
</style>


/* 测试git的注释 */
