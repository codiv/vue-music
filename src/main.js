import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router'

import 'common/stylus/index.styl'

/* 解决移动端点击300毫秒的问题 */
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})