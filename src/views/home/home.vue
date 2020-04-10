<template>
  <div id="home">
    <Nav-Bar class="home-navbar">
      <div slot="center">首页</div>
    </Nav-Bar>
    <!-- 这里再复制一个tabControl做障眼法，监听滚动到某位置了让他显示和消失，看起来就是和下面另一个tabControl重合一样 -->
    <TabControl
      :titles="['流行','新款','精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></TabControl>

    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <HomeSwiper :banners="banners" @HomeSwiperImageLoad="HomeSwiperImageLoad"></HomeSwiper>
      <HomeRecommendView :recommends="recommends"></HomeRecommendView>
      <HomeFeatureView></HomeFeatureView>
      <TabControl :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></TabControl>
      <GoodsList :goods="goods[currentGoods].list"></GoodsList>
    </Scroll>
    <BackTop @click.native="BackClick" v-show="isShowBackTop"></BackTop>
    <!-- 当我们需要监听组件的原生事件需要加native -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import HomeFeatureView from "./childComps/HomeFeature";
import TabControl from "components/content/TabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop";

import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata } from "network/home";
import { getHomeGoodsData } from "network/home";

import { debounce } from "@/common/utilis";

export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentGoods: "pop",
      isShowBackTop: false,
      tabBackOffset: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoodsData("pop");
    this.getHomeGoodsData("new");
    this.getHomeGoodsData("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 10);
    // 监听item中的图片加载完成后调用refresh
    // 但是bus这个方法现在默认是空的不能用，所以要到mainjs里面在vue的prototype里面给bus设置成一个vue实例
    this.$bus.$on("itemImageLoad", () => {
      // 以后只要是拿组件或者元素的都要写在mounted里，写在created可能会拿不到
      // 但是这里还存在一个问题，就是refresh被调用太频繁了，没加载一张图壭刷一次，不合适，需要用到一个防抖函数，把refresh装进去，控制一下,这里就是把原来要调用30次的refresh装到debounce里面，然后设置10毫秒时间，这样外面的refresh的确是调用了30次，但是10毫秒时间之内，可能很多的内部真正的refresh刷新已经被clearTimout清除掉了，所以就实现了少刷新几遍的功能，就是防抖
      refresh();
    });
  },

  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY =  this.$refs.scroll.getScrollY()
  },
  methods: {
    /* 事件监听方法 */
    tabClick(index) {
      console.log(index);
      this.currentGoods = Object.keys(this.goods)[index];
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    BackClick() {
      this.$refs.scroll.scrollTo(0, 0, 800);
      // 用refs拿到scroll组件的scroll实例对象，然后用他的scrollto方法，可以自动滚到顶部，后面的参数分别是x，y坐标，500是滚动时间
    },
    contentScroll(position) {
      // console.log(position);
      // 决定向上箭头是否显示
      this.isShowBackTop = -position.y > 1000;
      // 决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabBackOffset;
    },
    loadMore() {
      this.getHomeGoodsData(this.currentGoods);
      // 这里是先请求额外的数据，然后再刷新一下scroll，不然会有拖不动的bug，这是因为一开始图片没有请求来的时候scroll已经计算出content能滚的范围，这个范围高度其实是scroll中的scrollerHeight属性提供的，等图片加载出的时候就会导致之前计算出来的可滚动的范围比现在的小，会出现bug，所以要用scroll.refresh()刷一下，但是图片加载的速度是不确定的，所以scrollerHeight也是不确定的，不建议直接在scroll里面把scrollerHeight改成很高。所以需要每一张图片加载的时候都刷一下，所以这里要到图片所在的那个组件，也就是HomeGoodsListItem里面对img做一个监听。如果是原生的对图片加载监听的话用img.onload=function(){},但是vue已经提供了一个@load=“”即可。切换到HomeGoodsListItem界面继续
    },
    HomeSwiperImageLoad() {
      console.log(this.$refs.tabControl2.$el.offsetTop);

      this.tabBackOffset = this.$refs.tabControl2.$el.offsetTop;
      // 想要实现tabControl栏的固定，就需要拿到tabControl的offsetp值，但是tabControl是一个组件不能像原生的div一样直接用offsettop拿到，需要先
      // $refs.$tabControl拿到组件，再用$el获取组件的内部元素，这样才可以获取offsettop。而如果把HomeSwiperImageLoad()放在mounted里面，而没有从HomeSwiper组件发射过来再触发HomeSwiperImageLoad()盄话，此时拿到offsettop还不是准确的，因为直接在mounted里取offsettop的时候，tabControl栏的上部分的图片都还没加载，会使得高度不准确，偏低，所以要对上面的图片监听加载，加载完了再计算高度，为什么只监听轮播图而不监听其余的，是因为测试发现轮播图影响最大。
    },

    /* 网络请求方法 */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res.data);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoodsData(type) {
      const page = this.goods[type].page + 1;
      getHomeGoodsData(type, page).then(res => {
        console.log(res.data.list);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-navbar {
  background-color: var(--color-tint);
  color: #ffffff;

  /*   position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; 
  因为scroll可以实现局部滚动，所以原来为了让原生状态下home-navbar不被原生滚动而滚动的fixed属性失去了意义，可以去掉。去掉他也是固定在顶部，下面的内容被包裹在了scroll里可以局部滚动*/
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} 这个属性失效了，用别的方法再实现*/
.content {
  /* height:calc(100% - 93px);;
  overflow: hidden;
    想要实现tabControl的障眼法的话，上面计算属性的这方法是不行的，会有bug，必须要用下面的定位的方法
   */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* z-index: 9; */
}
/* .fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  这个不起作用因为tabControl脱标了，是因为scroll内部原理造成的bug，所以要用其他的办法实现
} */
.tab-control {
  position: relative;
  z-index: 9;
}
</style>