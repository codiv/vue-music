<template>
	<div class="recommend">
		<scroll ref="scroll" class="recommend-content" :loadData="discList">
			<div>
				<div class="slider-wrapper" v-if="recommends.length">
					<slider>
						<div v-for="item in recommends">
							<a :href="item.linkUrl">
								<!--注：class="needsclick"解决fastclick插件无法点击问题-->
								<img :src="item.picUrl" @load="imagesLoad" class="needsclick">
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li v-for="item in discList" class="item">
							<div class="icon">
								<!--v-lazy是vue-lazyload插件提供的图片懒加载-->
								<img v-lazy="item.imgurl" width="60" height="60">
							</div>
							<div class="text">
								<h2 class="name" v-html="item.creator.name"></h2>
								<p class="desc" v-html="item.dissname"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="loading-container" v-if="!discList.length">
				<loading></loading>
			</div>
		</scroll>
	</div>

</template>

<script type="text/ecmascript-6">
	import {getRecommend, getDiscList} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	import Slider from 'base/slider/slider'
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'

	export default {
		data () {
			return {
				recommends: [],
				discList: []
			}
		},
		created() {
			this._getRecommend()
			this._getDiscList()
		},
		methods: {
			_getRecommend() {
				getRecommend().then((res) => {
					if (res.code === ERR_OK) {
						this.recommends = res.data.slider
					}
				})
			},
			_getDiscList() {
				getDiscList().then((res) => {
					if (res.code === ERR_OK) {
						this.discList = res.data.list
					}
				})
			},
			imagesLoad() {
				if (!this.checkloaded) { // this.checkloaded设置加载时候只执行一次
					this.$refs.scroll.refresh()
					this.checkloaded = true
				}
			}
		},
		components: {
			Slider,
			Scroll,
			Loading
		}
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.recommend
		position: fixed
		width: 100%
		top: 88px
		bottom: 0
		.recommend-content
			height: 100%
			overflow: hidden
			.slider-wrapper
				position: relative
				width: 100%
				overflow: hidden
			.recommend-list
				.list-title
					height: 65px
					line-height: 65px
					text-align: center
					font-size: $font-size-medium
					color: $color-theme
				.item
					display: flex
					align-items: center
					padding: 0 20px 20px 20px
					.icon
						flex: 0 0 60px
						width: 60px
						padding-right: 20px
					.text
						display: flex
						flex-direction: column
						justify-content: center
						flex: 1
						line-height: 20px
						overflow: hidden;
						font-size: $font-size-medium
						.name
							margin-bottom: 10px;
							color: $color-text
						.desc
							color: $color-text-d

			.loading-container
				position: absolute
				width: 100%
				top: 50%
				transform: translateY(-50%)
</style>
