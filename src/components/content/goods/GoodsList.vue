<template>
    <div class="goods-list">
           <GoodsListItem :goodsItem="item" v-for="(item,index) in goods" :key="index"  ></GoodsListItem>
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        GoodsListItem
    }
}
</script>

<style>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
}
</style>