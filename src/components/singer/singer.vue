<template>
	<div class="singer">
		<listview :singer="singers" @select="selectSinger"></listview>
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import listview from 'base/listview/listview'
	import {getSingerList} from 'api/singer'
	import {ERR_OK} from 'api/config'
	import Singer from 'common/js/singer'
	import {mapMutations} from 'vuex'

	const HOT_SINGER_LEN = 10
	const HOT_NAME = '热门'

	export default {
		data() {
			return {
				singers: []
			}
		},
		created() {
			this._getSingerList()
		},
		methods: {
			selectSinger(item) {
				this.$router.push({
					path: `/singer/${item.id}`
				})
				this.setSinger(item)
			},
			_getSingerList() {
				getSingerList().then((res) => {
					if (res.code === ERR_OK) {
						this.singers = this._normalizeSinger(res.data.list)
					}
				})
			},
			_normalizeSinger(list) {
				let map = {
					hot: {
						title: HOT_NAME,
						items: []
					}
				}
				list.forEach((item, index) => { //forEach遍历数组
					if (index < HOT_SINGER_LEN) {
						map.hot.items.push(new Singer({
							name: item.Fsinger_name,
							id: item.Fsinger_mid
						}))
					}
					const key = item.Findex
					if (!map[key]) { //同字母归类
						map[key] = {
							title: key,
							items: []
						}
					}
					map[key].items.push(new Singer({
						name: item.Fsinger_name,
						id: item.Fsinger_mid
					}))
				})
				// 为了得到有序列表，我们需要处理 map
				let ret = []
				let hot = []
				for (let i in map) { //遍历map对象的属性
					let val = map[i]
					//match()在字符串内检索指定的值，或找到一个或多个正则表达式的匹配
					if (val.title.match(/[a-zA-Z]/)) {
						ret.push(val)
					} else if (val.title === HOT_NAME) {
						hot.push(val)
					}
				}
				ret.sort((a, b) => { //对数组的元素进行排序
					//若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				})
				return hot.concat(ret) //用于连接两个或多个数组
			},
			...mapMutations({
				setSinger: 'SET_SINGER' //跟store/mutations-types.js	里的SET_SINGER映射
			})
		},
		components: {
			listview
		}
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.singer
		position: fixed
		top: 88px
		bottom: 0
		width: 100%

</style>
