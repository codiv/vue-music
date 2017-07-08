<template>
	<div class="suggest">
		<ul class="suggest-list">
			<li class="suggest-item">
				<div class="icon">
					<i></i>
				</div>
				<div class="name">
					<p class="text"></p>
				</div>
			</li>
		</ul>
	</div>

</template>

<script type="text/ecmascript-6">
	import {search} from 'api/search'
	import {ERR_OK} from 'api/config'

	const TYPE_SINGER = 'singer'

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
				page: 1 //第几页
			}
		},
		methods: {
			search() {
				search(this.query, this.page, this.showSinger).then((res) => {
					if (res.code === ERR_OK) {
						this._genResult(res.data)
					}
				})
			},
			_genResult(data) {
				let ret = []
				if (data.zhida && data.zhida.singerid) {
					ret.push({...data.zhida, ...{type: TYPE_SINGER}})
				}
				console.log(ret)
				console.log(data.zhida)
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
