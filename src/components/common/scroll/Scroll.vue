<template>
  <div ref="wrapper" class="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    data(){
        return {
            scroll:null
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{

        })
    }
}
</script>

<style scoped>
.wrapper{
   /*  height: 200px; */
}
</style>