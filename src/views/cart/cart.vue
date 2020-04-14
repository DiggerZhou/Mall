<template>
  <div class="cart">
      <NavBar class="nav-bar"><div slot="center">购物车({{cartLength}})</div></NavBar>
      <CartList></CartList>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childcomps/CartList'
export default {
  components:{
    NavBar,
    CartList
  },
  computed:{
    cartLength(){
      return this.$store.state.cartList.length
    }
  }
}
</script>

<style scoped>
/* .cart{
  height: 100vh;
} */
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>