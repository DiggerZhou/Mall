<template>
  <div id="home">
    <Nav-Bar class="home-navbar">
      <div slot="center">首页</div>
    </Nav-Bar>
    <Scroll class="content">
      <HomeSwiper :banners="banners"></HomeSwiper>
      <HomeRecommendView :recommends="recommends"></HomeRecommendView>
      <HomeFeatureView></HomeFeatureView>
      <TabControl :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></TabControl>
      <GoodsList :goods="goods[currentGoods].list"></GoodsList>
    </Scroll>
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
    Scroll
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
      currentGoods:'pop'
    }
  },
  created(){
    this.getHomeMultidata()
    this.getHomeGoodsData('pop')
    this.getHomeGoodsData('new')
    this.getHomeGoodsData('sell')
  },
  methods:{
    /* 事件监听方法 */
    tabClick(index){
      console.log(index)
      this.currentGoods = Object.keys(this.goods)[index]
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