<template>
  <div id="home">
    <Nav-Bar class="home-navbar">
      <div slot="center">首页</div>
    </Nav-Bar>
    <Scroll class="content" ref="scroll" :probe-type='3' :pull-up-load='true'
    @scroll='contentScroll'
    @pullingUp='loadMore'
    >
      <HomeSwiper :banners="banners"></HomeSwiper>
      <HomeRecommendView :recommends="recommends"></HomeRecommendView>
      <HomeFeatureView></HomeFeatureView>
      <TabControl :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></TabControl>
      <GoodsList :goods="goods[currentGoods].list"></GoodsList>
    </Scroll>
    <BackTop @click.native="BackClick" v-show="isShowBackTop"></BackTop> 
     <!-- 当我们需要监听组件的原生事件需要加native -->
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
      <li>31</li>
      <li>32</li>
      <li>33</li>
      <li>34</li>
      <li>35</li>
      <li>36</li>
      <li>37</li>
      <li>38</li>
      <li>39</li>
      <li>40</li>
      <li>41</li>
      <li>42</li>
      <li>43</li>
      <li>44</li>
      <li>45</li>
      <li>46</li>
      <li>47</li>
      <li>48</li>
      <li>49</li>
      <li>50</li>
    </ul>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps/HomeFeature'
import TabControl from 'components/content/TabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'

import Scroll from 'components/common/scroll/Scroll'


import {getHomeMultidata} from 'network/home'
import {getHomeGoodsData} from 'network/home'




export default {
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentGoods:'pop',
      isShowBackTop:false
    }
  },
  created(){
    this.getHomeMultidata()
    this.getHomeGoodsData('pop')
    this.getHomeGoodsData('new')
    this.getHomeGoodsData('sell')
  },
  mounted(){
    const refresh = this.debounce(this.$refs.scroll.refresh,10)
      // 监听item中的图片加载完成后调用refresh
    // 但是bus这个方法现在默认是空的不能用，所以要到mainjs里面在vue的prototype里面给bus设置成一个vue实例
    this.$bus.$on('itemImageLoad',() =>{
      
      // 以后只要是拿组件或者元素的都要写在mounted里，写在created可能会拿不到
      // 但是这里还存在一个问题，就是refresh被调用太频繁了，没加载一张图壭刷一次，不合适，需要用到一个防抖函数，把refresh装进去，控制一下,这里就是把原来要调用30次的refresh装到debounce里面，然后设置10毫秒时间，这样外面的refresh的确是调用了30次，但是10毫秒时间之内，可能很多的内部真正的refresh刷新已经被clearTimout清除掉了，所以就实现了少刷新几遍的功能，就是防抖
      refresh()
    })
  },
  methods:{
    /* 事件监听方法 */
    debounce(func,delay){
      // 这是防抖函数
      let timer = null
      return function(...args){
        if(timer)clearTimeout(timer)
        timer = setTimeout(() =>{
          func.apply(this,args)
        },delay)
      } 
    },

    tabClick(index){
      console.log(index)
      this.currentGoods = Object.keys(this.goods)[index]
    },
    BackClick(){
      this.$refs.scroll.scroll.scrollTo(0,0,800)
      // 用refs拿到scroll组件的scroll实例对象，然后用他的scrollto方法，可以自动滚到顶部，后面的参数分别是x，y坐标，500是滚动时间
    },
    contentScroll(position){
      // console.log(position);
      this.isShowBackTop = (-position.y)>1000
    },
    loadMore(){
      this.getHomeGoodsData(this.currentGoods)
      // 这里是先请求额外的数据，然后再刷新一下scroll，不然会有拖不动的bug，这是因为一开始图片没有请求来的时候scroll已经计算出content能滚的范围，这个范围高度其实是scroll中的scrollerHeight属性提供的，等图片加载出的时候就会导致之前计算出来的可滚动的范围比现在的小，会出现bug，所以要用scroll.refresh()刷一下，但是图片加载的速度是不确定的，所以scrollerHeight也是不确定的，不建议直接在scroll里面把scrollerHeight改成很高。所以需要每一张图片加载的时候都刷一下，所以这里要到图片所在的那个组件，也就是HomeGoodsListItem里面对img做一个监听。如果是原生的对图片加载监听的话用img.onload=function(){},但是vue已经提供了一个@load=“”即可。切换到HomeGoodsListItem界面继续
      
    },
    /* 网络请求方法 */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      console.log(res.data);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })},
    getHomeGoodsData(type){
      const page = this.goods[type].page + 1
      getHomeGoodsData(type,page).then(res =>{
        console.log(res.data.list)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1
        this.$refs.scroll.scroll.finishPullUp()
      })
    }
  
    
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
}
.home-navbar {
  background-color: var(--color-tint);
  color: #ffffff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content{
  height:calc(100% - 49px);;
  overflow: hidden;
}
</style>