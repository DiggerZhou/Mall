<template>
  <TabBar>
      <TabBarItem path="/home" >
        <img src="~assets/images/tabbar/home.svg" alt slot="item-icon" />
        <img src="~assets/images/tabbar/home_active.svg" alt slot="item-icon-active" />
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem path="/category" >
        <img src="~assets/images/tabbar/category.svg" alt slot="item-icon" />
        <img src="~assets/images/tabbar/category_active.svg" alt slot="item-icon-active" />
        <div slot="item-text">分类</div>
      </TabBarItem>
      <TabBarItem path="/cart" >
        <img src="~assets/images/tabbar/shopcart.svg" alt slot="item-icon" />
        <img src="~assets/images/tabbar/shopcart_active.svg" alt slot="item-icon-active" />
        <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem path="/profile" >
        <img src="~assets/images/tabbar/profile.svg" alt slot="item-icon" />
        <img src="~assets/images/tabbar/profile_active.svg" alt slot="item-icon-active" />
        <div slot="item-text">我的</div>
      </TabBarItem>
    </TabBar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
    components:{
        TabBar,
        TabBarItem
    }
}
</script>

<style>

</style>