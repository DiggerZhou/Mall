<template>
  <div class="detail">
    <DetailNavBar class="detail-nav" @DetailTitleClick="DetailTitleClick" ref="nav"></DetailNavBar>
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad" class="goods-info"></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo" ref="params"></DetailParamInfo>
      <DetailCommentInfo :commentInfo="commentInfo" ref="comment"></DetailCommentInfo>
      <!-- <GoodsList :goods="recommends"></GoodsList> -->
      <DetailRecommendInfo :goods="recommends" ref="recommend"></DetailRecommendInfo>
    </Scroll>
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
    <BackTop @click.native="BackClick" v-show="isShowBackTop"></BackTop>

    <!-- <Toast :message="message" :show="show"></Toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import {
  getDetail,
  getRecommned,
  GoodsInfo,
  Shop,
  GoodsParam
} from "network/detail";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
// import GoodsList from "components/content/goods/GoodsListItem";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import Scroll from "components/common/scroll/Scroll";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import Toast from "components/common/toast/Toast";
export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0
      // message: "",
      // show: false
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.id;
    console.log(this.iid);

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res.result.itemInfo.topImages);
      console.log(res.result);
      const data = res.result;
      // 轮播图的数据
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取商家信息
      this.shop = new Shop(data.shopInfo);

      //   获取商品详细信息
      this.detailInfo = data.detailInfo;

      // 获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 3.请求详情页推荐数据
    getRecommned().then(res => {
      console.log(res);
      console.log(res.data.list);
      this.recommends = res.data.list;
    });
  },
  mounted() {
    setTimeout(() => {
      this.$bus.$on("itemImageLoad", () => {
        this.$refs.scroll.refresh();
      });
    }, 2000);
  },
  methods: {
    imageLoad() {
      // this.newRefresh();
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
      // 这里必须要把themeTopYs重置为空，不然每一个refresh都会往themeTopYs填充数据
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // 这里拿到这几个组件的offsettop，因为组件本身是没有offsettop的，必须要加$el
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    },
    DetailTitleClick(index) {
      console.log(index);
      // 这里是Detail的导航栏点击哪个选项就滑倒那个选项所在的高度，即它的offsettop，把点击的那个index传过来，然后在上面的data里设置一个跳转高度的数组themeTopYs，根据index再scroll到index对应的高度即可。这是基本思路
      // 但是问题在于themeTopYs中的值是在哪里获取，是created还是mounted还是methods？
      // created不行，因为created里根本就还没有产生组件元素，是获取不到的。显示offsettop是未定义
      // mounted也不行，mounted虽然已经组件元素有了，但是只有骨架，没有获取到数据。显示offsettop是未定义
      // 并且在上面一系列获取商家信息，获取推荐信息等获取数据操作之后再去获取offsettop也是不行的，因为此时虽然数据请求过来了， 但是数据还是要进行渲染的，数据给到每一个子组件，等他们有了元素骨架后，进行数据渲染也是异步的，此时直接获取offsettop也是不行的。显示offsettop是未定义

      // 此时有个加强版的方法，就是在上面一系列获取商家信息，获取推荐信息等获取数据操作之后再去用$nexttick（）再去获取，也是不行的。首先，$nexttick（）意思是等数据传给子组件了并且数据渲染了，才会调用的。理论上这里可以取到offsettop值了，但是由于虽然数据渲染了，但是图片加载需要时间，还是会造成offsettop值不对，这里能取到值，但是值不对，显示offsettop是有值，但是会偏小，取得值是不包含图片的高度的。
      // 所以真正的办法是要在图片加载完成后，再去获取高度才是正确的，什么时候加载完成呢？就是上面有个监听图片加载然后refresh的这个位置，在此处获取一下offsettop就是正确的。可以实现功能，但是可能会太频繁的获取，老样子还是可以用debounce防抖一下。

      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
      // 这里再根据每一个组件的offsettop滚动到相应位置
    },
    contentScroll(position) {
      // 这里是根据监听scroll到的滚动位置来让相应的选项变红色，即选中
      // console.log(position);
      const positionY = -position.y;
      // console.log(positionY);

      let length = this.themeTopYs.length;
      // console.log(this.themeTopYs.length);
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      // 添加到购物车,先取到要传到购物车界面的数据
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;
      // 然后用vuex保存这些数据
      // 然后将这些数据添加到cartList里面去，同事用promise的then继续做toast
      // 这里不能直接弹出弹框说我已经添加商品成功之类的，必须要actions里用promise返回，确认我已经添加成功了，才能继续弹窗
      this.$store.dispatch("addCart", product).then(res => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);这种是普通的toast组件用法，但是toast非常的常用，如果每用一次都要重复这样操作，太麻烦了，所以不采用这种普通的方法
        this.$toast.show(res, 2000);
      });
    }
  },

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    // GoodsList,
    DetailRecommendInfo,
    DetailBottomBar,
    Scroll,
    Toast
  }
};
</script>

<style scoped>
.detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
.goods-info {
  position: relative;
}
</style>