<template>
  <div v-if="Object.keys(detailInfo).length !==0" class="goods-info">
      <div class="info-desc">
          <div class="start"></div>
          <div class="desc">{{detailInfo.desc}}</div>
          <div class="end"></div>
      </div>
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
      <div class="info-list">
          <img :src="item" alt="" v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" @load='imageLoad'>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        detailInfo:{
            type:Object
        }
    },
    data(){
        return{
            counter:0,
            imagesLength:0
        }
    },
    methods:{
        imageLoad(){
            // this.$emit('imageLoad')这里发射出去是监听图片加载，每加载一个就让Detail组件refresh一下scroll重新计算高度，不然会因为图片加载不够快导致滚动有问题，但是每加载一张图就要调用一次，比较浪费性能，所以这里可以采用防抖功能，之前用过的。也可以采取另一个办法，这里用一下
        //  if(++this.counter === this.imagesLength){
        //         this.$emit('imageLoad')
        //     }
            // 额外设置两个参数，每次监听图片加载就让counter加一，知道counter和图片列表的长度一样才发射refresh

            // -------------------上面的这种用counter和下面watch结合一起的办法，有时候还是会滚不动，个人认为不可取，还是直接每一次图片加载都刷新好一点，如下
        this.$emit('imageLoad');
        }
    },
    watch:{
        detailInfo(){
            // 本来上面发射之前++this.counter === this.imagesLength中的this.imagesLength是可以写成this.detailInfo.detailImage[0].list.length，就是每加载一张图片就获取一下图片列表的长度，这样做没问题，就是耗费性能，所以先把imagesLength定义为0，然后watch监听一下props中detailInfo的变化，也就是只要数据传递过来了，就获取一下图片列表的长度，在watch里监听获取长度只要监听一次就行，也就是介节约了性能
            this.imagesLength = this.detailInfo.detailImage[0].list.length

            // 不过这些都只是锦上添花，用户并不一定知道，可以不弄，直接简单粗暴每一次图片加载都监听，这样滚动就万无一失不会出问题
        }
    }
}
</script>

<style scoped>
.goods-info{
    padding: 20px 0;
    border-top: 5px solid #f2f5f8;
    border-bottom: 5px solid #f2f5f8;
}
.info-desc{
    padding: 0 15px;
}
.info-desc .start,.info-desc .end{
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
}
.info-desc .start{
    float: left;
}
.info-desc .end{
    float: right;
}
.info-desc .desc{
    padding: 15px 0;
    font-size: 14px;
}
.info-desc .start::before,.info-desc .end::after{
    content: '';
    width: 5px;
    height: 5px;
    background-color: #333;
    position: absolute;
    bottom: 0;
}
.info-desc .end::after{
    right: 0;
}
.info-key{
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
}
.info-list img{
    width: 100%;
}
</style>