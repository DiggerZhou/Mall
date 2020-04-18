<template>
  <GridView>
    <GoodsListItem v-for="(item,index) in categoryDetail" :key="index" :goodsItem="item"></GoodsListItem>
  </GridView>
</template>

<script>
import GridView from "components/common/gridView/GridView";
import GoodsListItem from "components/content/goods/GoodsListItem";
export default {
  props: {
    categoryDetail: {
    //   type: Object
    }
  },
  components: {
    GridView,
    GoodsListItem
  }
};
</script>

<style>
</style>