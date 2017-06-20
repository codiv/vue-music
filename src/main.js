import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router'
import VueLazyload from 'vue-lazyload'
import store from './store'

import 'common/stylus/index.styl'

/* 解决移动端点击300毫秒的问题 */
fastclick.attach(document.body)

/* 图片懒加载，用法：用v-lazy代替src即可 */
Vue.use(VueLazyload, {
    loading: require('common/image/default.png') //默认图片
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})