<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" @load='imageLoad'  alt/>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods:{
    imageLoad(){
       //这里@load='imageLoad就是每加载一张图片就监听一次，然后调用scroll盄refresh方法刷一下，防止scrollHeight没有及时更新计算导致下拉bug；
       //这里要调用scroll盄refresh方法，但是两个组件之间不能直接相互调用，一种比较麻烦的方法是，GoodsListItem组件传递给GoodsList再传给home组件，由home调用refresh；简单的方法是用vuex来做，但是vuex管理的一般是状态，也就是变量，还需要另外设置一个变量，监听变量变化让home组件去调用refresh，也不是很方便；这里就有一个比较少用但是这里最合适方法，用事件总线，和vuex一样功能，但是他监听的是事件而不是状态；
       this.$bus.$emit('itemImageLoad')
    },
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
};
</script>

<style>
.goods-item {
  width: 48%;
  padding-bottom: 40px;
  position: relative;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 5px;
  font-size: 12px;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
}
</style>