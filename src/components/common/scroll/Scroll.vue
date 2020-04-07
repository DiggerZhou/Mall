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
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            scroll:null
        }
    },
    mounted(){
        // 1.创建scroll实例
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })

        // 2.监听滚动位置
        this.scroll.on('scroll',(position) =>{
            this.$emit('scroll',position)
            
        })  

        // 3.监听加载更多
        this.scroll.on('pullingUp',() =>{
            this.$emit('pullingUp')
        })
    },
    methods:{
        refresh(){
            console.log('000');
            this.scroll.refresh()
        }
    }
}
</script>

<style scoped>
.wrapper{
   /*  height: 200px; */
}
</style>