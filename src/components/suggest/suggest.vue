<template>
	<div class="suggest">
		<ul class="suggest-list">
			<li class="suggest-item" v-for="item in result">
				<div class="icon">
					<i :class="getIconCls(item)"></i>
				</div>
				<div class="name">
					<p class="text" v-html="getDisplayName(item)"></p>
				</div>
			</li>
		</ul>
	</div>

</template>

<script type="text/ecmascript-6">
	import {search} from 'api/search'
	import {ERR_OK} from 'api/config'
	import {filterSinger} from 'common/js/songs'

	const TYPE_SINGER = 'singer' //用于“歌手与歌曲”的区别

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
					return `${item.songname}-${filterSinger(item.singer)}`
				}
			},
			search() {
				search(this.query, this.page, this.showSinger).then((res) => {
					if (res.code === ERR_OK) {
						this.result = this._genResult(res.data)
						console.log(this.result)
					}
				})
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
					ret = ret.concat(data.song.list)
				}
				return ret
			}
		},
		watch: {
			query() {
				this.search()
			}
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
