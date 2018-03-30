import Vue from 'vue'
import App from './App'
import Ajax from 'utils/ajax'
import router from './router/index'
import 'common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(Ajax, {
  baseURL: 'http://65.49.197.99:3000/'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
