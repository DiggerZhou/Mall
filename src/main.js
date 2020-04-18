import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

import toast from 'components/common/toast'

import FastClick from 'fastclick'

import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
// 注册toast全局插件
Vue.use(toast)
// 300ms延迟的解决方法
FastClick.attach(document.body)

// 使用图片懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/images/common/placeholder.png')
  // loading是占位置的，github上的vuelazyload还有很多的选择项，loading只是其中一种
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


/* axios({
  url: 'http://123.207.32.32:8000/home/multidata'
}).then(res => {
  console.log(res);

})

axios({
  url: 'http://123.207.32.32:8000/home/data?type=sell&page=3'
}).then(res => {
  console.log(res);

}) */
