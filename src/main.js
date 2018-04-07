import Vue from 'vue'
import App from './App'
import Ajax from 'utils/ajax'
import router from './router/index'
import store from './store'
import VueLazyload from 'vue-lazyload'
import 'common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(Ajax, {
  baseURL: 'http://65.49.197.99:3000/'
})

Vue.use(VueLazyload, {
  loading: require('common/image/loading/lazy-loading.jpg')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


