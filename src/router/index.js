import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend'
import singer from 'components/singer/singer'
import rank from 'components/rank/rank'
import search from 'components/search/search'

Vue.use(Router)

export default new Router({
    'linkActiveClass': 'active', //修改默认样式名
    mode: 'history', //HTML5 History 模式，去掉URL中的“#”号
    routes: [
        {
            path: '/',
            redirect: 'recommend'
        },
        {
            path: '/recommend',
            component: recommend
        },
        {
            path: '/singer',
            component: singer
        },
        {
            path: '/rank',
            component: rank
        },
        {
            path: '/search',
            component: search
        }
    ]
})
