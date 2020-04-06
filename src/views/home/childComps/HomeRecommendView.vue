<template>
  <div class="recommend">
     <div v-for="(item,index) in recommends" :key="index" class="recomment-item">
          <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
      </a>
     </div>
  </div>
</template>

<script>
export default {
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
.recommend{
    display: flex;
    text-align: center;
    padding-top:10px;
    padding-bottom: 15px;
    width: 100%;
    border-bottom: 15px solid #eee;
    font-size: 14px;
}
.recomment-item{
    flex: 1;
}
.recomment-item img{
    width: 70px;
    height: 70px;
}
</style>