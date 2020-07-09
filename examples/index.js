import Vue from 'vue'
import vant from 'vant'
import App from './app'
import './style.less'

Vue.use(vant)
const el = document.getElementById('epage')

/* eslint-disable no-new */
new Vue({
  el,
  render: h => h(App)
})
