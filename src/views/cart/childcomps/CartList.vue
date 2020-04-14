<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <CartListItem v-for="(item,index) in $store.state.cartList" :key="index" :product = "item"></CartListItem>
    </scroll>
  </div>
</template>

<script>
import scroll from "components/common/scroll/Scroll";
import CartListItem from './CartListItem'
export default {
  components: {
    scroll,
    CartListItem
  },
  activated(){
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>