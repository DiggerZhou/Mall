<template>
  <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad">
          </a>
        </swiper-item>
      </swiper>
</template>

<script>

import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    props:{
        banners:{
            type:Array,
            default(){
                return[]
            }
        }
    },
    data(){
      return {
        isLoad :false
      }
    },
    methods:{
      imageLoad(){
        if(!this.isLoad)
        this.$emit('HomeSwiperImageLoad')
        this.isLoad = true
        // 这里的操作办法是为了让这个发射只发生一次，因为轮播图有一张加载了就可以确定高度了
      }
    },
    components:{
    Swiper,
    SwiperItem
  },
}
</script>

<style>

</style>