import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


axios({
  url: 'http://123.207.32.32:8000/home/multidata'
}).then(res => {
  console.log(res);

})

axios({
  url: 'http://123.207.32.32:8000/home/data?type=sell&page=3'
}).then(res => {
  console.log(res);

})
