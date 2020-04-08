<template>
  <div>
    <NavBar>
        <div slot="left" class="back" @click="backClick">
            <img src="~assets/images/common/back.svg" alt="">
        </div>
      <div slot="center"  class="title">
        <div v-for="(item,index) in this.titles" :key="index"
        class="title-item"
        :class="{active:index===currentIndex}"
        @click="itemClick(index)"
        >{{item}}</div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },
  components: {
    NavBar
  },
  methods:{
      itemClick(index){
          this.currentIndex = index
      },
      backClick(){
          this.$router.go(-1)
      }
  }
};
</script>

<style scoped>
    .title{
        display: flex;
    }
    .title-item{
        flex: 1;
    }
    .active{
        color: var(--color-high-text)
    }
    .back img {
        margin-top: 12px;
    }
</style>