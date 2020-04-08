<template>
  <div>
      <DetailNavBar></DetailNavBar>
      <DetailSwiper :topImages="topImages"></DetailSwiper>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import {getDetail} from 'network/detail'

export default {
    name: 'Detail',
    data(){
        return {
            iid:null,
            topImages:[]
        }
    },
    created(){
          // 1.保存传入的iid
        this.iid = this.$route.params.id
        console.log(this.iid);
        
           // 2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            console.log(res.result.itemInfo.topImages);
            // 轮播图的数据
            this.topImages = res.result.itemInfo.topImages
        })

    },
    components:{
        DetailNavBar,
        DetailSwiper
    }
}
</script>

<style>

</style>