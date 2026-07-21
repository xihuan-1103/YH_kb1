import Vue from 'vue'

import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/font/font.css'
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

// 初始化 mock 数据拦截
import './mock'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
