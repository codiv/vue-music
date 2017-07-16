<template>
	<scroll class="suggest"
			ref="suggest"
			:loadData="result"
			:pullup="pullup"
			:beforeScroll="beforeScroll"
			@srcollToEnd="seachMore"
			@beforeScroll="listScroll"
	>
		<ul class="suggest-list">
			<li class="suggest-item" v-for="item in result" @click="selectItem(item)">
				<div class="icon">
					<i :class="getIconCls(item)"></i>
				</div>
				<div class="name">
					<p class="text" v-html="getDisplayName(item)"></p>
				</div>
			</li>
			<loading v-show="hasMore" title=""></loading>
		</ul>
		<div v-show="!hasMore && !result.length" class="no-result-wrapper">
			<no-result title="抱歉，暂无搜索结果"></no-result>
		</div>
	</scroll>
</template>

<script type="text/ecmascript-6">
	import {search} from 'api/search'
	import {ERR_OK} from 'api/config'
	import {createSong} from 'common/js/songs'
	import Scroll from 'base/scroll/scroll'
	import NoResult from 'base/no-result/no-result'
	import Loading from 'base/loading/loading'
	import Singer from 'common/js/singer'
	import {mapMutations, mapActions} from 'vuex'

	const TYPE_SINGER = 'singer' //用于“歌手与歌曲”的区别
	const PERPAGE = 20 //每页20条

	export default {
		props: {
			query: {
				type: String,
				default: ''
			},
			showSinger: { //默认显示歌手
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				page: 1, //第几页
				pullup: true, //是否开启上拉加载
				hasMore: true,
				beforeScroll: true,
				result: []
			}
		},
		methods: {
			getIconCls(item) {
				if (item.type === TYPE_SINGER) {
					return 'icon-mine'
				} else {
					return 'icon-music'
				}
			},
			getDisplayName(item) {
				if (item.type === TYPE_SINGER) {
					return item.singername
				} else {
					//filterSinger()是把多个歌手转成字符串放在一起
					return `${item.name}-${item.singer}`
				}
			},
			search() {
				/*
				 * 在这里初始化this.page 、this.hasMore与this.$refs.suggest.scrollTo(0, 0)
				 * 原因：
				 * 同一个关键词，在搜索框多次搜索时，如果不刷新页面时，
				 * 则，第二次以上搜索，就会出来数据缺少的情况。
				 * 验证：
				 * 可以在seachMore() 方法里的“this.page++”后面console验证一下
				 * */
				this.page = 1
				this.hasMore = true
				this.$refs.suggest.scrollTo(0, 0) //保证初始时，scroll是在最上面
				search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
					if (res.code === ERR_OK) {
						this.result = this._genResult(res.data)
						this._checkMore(res.data)
					}
				})
			},
			seachMore() {
				if (!this.hasMore) {
					return
				}
				this.page++
				search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
					if (res.code === ERR_OK) {
						this.result = this.result.concat(this._genResult(res.data))
						this._checkMore(res.data)
					}
				})
			},
			selectItem(item) {
				if (item.type === TYPE_SINGER) {
					const singer = new Singer({
						id: item.singermid,
						name: item.singername
					})
					this.$router.push({
						path: `/search/${singer.id}`
					})
					this.setSinger(singer)
				} else {
					this.insertSong(item)  //设置insertSong
				}
				this.$emit('select', item)
			},
			listScroll() {
				this.$emit('listScroll')
			},
			_genResult(data) {
				let ret = []
				//注意添加数组的顺序，因为显示时，歌手是最前面，则添加歌手在前
				if (data.zhida && data.zhida.singerid) {
					/*
					 * 三个点“...”是扩展运算符。
					 * 把“...data.zhida”整体拷贝到ret对象里
					 * 给“ ...{type: TYPE_SINGER}”ret对象赋值或者添加一个type属性，以下是修改值
					 * */
					ret.push({...data.zhida, ...{type: TYPE_SINGER}})
				}
				if (data.song) {
					ret = ret.concat(this._normalizeSongs(data.song.list))
				}
				return ret
			},
			_normalizeSongs(list) {
				const ret = []
				list.forEach((data) => {
					if (data.songid && data.albummid) {
						ret.push(createSong(data))
					}
				})
				return ret
			},
			_checkMore(data) {
				/*
				 *检测是否加载完所有的数据
				 * !song.list.length 表示没有返回数据
				 * */
				const song = data.song
				if (!song.list.length || (song.curnum + song.curpage * PERPAGE) > song.totalnum) {
					this.hasMore = false
				}
			},
			...mapMutations({
				setSinger: 'SET_SINGER' //跟store/mutations-types.js	里的SET_SINGER映射
			}),
			...mapActions([
				'insertSong' //调用insertSong
			])
		},
		watch: {
			query() {
				this.search()
			}
		},
		components: {
			Scroll,
			Loading,
			NoResult
		}
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"

	.suggest
		height: 100%
		overflow: hidden
		.suggest-list
			padding: 0 30px
			.suggest-item
				display: flex
				align-items: center
				padding-bottom: 20px
			.icon
				flex: 0 0 30px
				width: 30px
				[class^="icon-"]
					font-size: 14px
					color: $color-text-d
			.name
				flex: 1
				font-size: $font-size-medium
				color: $color-text-d
				overflow: hidden
				.text
					no-wrap()
		.no-result-wrapper
			position: absolute
			width: 100%
			top: 50%
			transform: translateY(-50%)

</style>
