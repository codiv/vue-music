<template>
	<div class="music-list">
		<div class="back" @click="back">
			<i class="icon-back"></i>
		</div>
		<h1 class="title" v-html="title"></h1>
		<div class="bg-images" :style="bgStyle" ref="bgImage"></div>
		<div class="bg-layer" ref="layer"></div>
		<scroll :loadData="songs" :probeType="probeType" :listenScroll="listenScroll" @scroll="scroll" class="list"
				ref="list">
			<div class="song-list-wrapper">
				<song-list :songs="songs"></song-list>
			</div>
			<div class="loading-wrapper" v-show="!songs.length">
				<loading></loading>
			</div>
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
	import scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import SongList from 'base/song-list/song-list'

	const RESERVED_HEIGHT = 40

	export default {
		props: {
			songs: {
				type: Array,
				default: []
			},
			bgImage: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				scrollY: 0
			}
		},
		created() {
			this.probeType = 3
			this.listenScroll = true
		},
		mounted() {
			this.imageHeight = this.$refs.bgImage.clientHeight //图片的高度
			this.minTranslateY = this.imageHeight - RESERVED_HEIGHT //translateY最大滚动高度
			this.$refs.list.$el.style['top'] = `${this.imageHeight}px`
		},
		methods: {
			back() {
				this.$router.back()
			},
			scroll(pos) {
				this.scrollY = pos.y
			}
		},
		watch: {
			scrollY(newY) {
				/*
				 * Math.max()返回两个指定的数中带有较大的值的那个数
				 * translateY 滚动不能超过this.imageHeight（图像）的最大高度
				 * 向上滚动则this.minTranslateY、newY为负值
				 */
				let translateY = Math.max(-this.minTranslateY, newY)
				this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
				this.$refs.layer.style['webkitTransform'] = `translate3d(0,${translateY}px,0)`
			}
		},
		computed: {
			bgStyle() {
				return `background-image:url(${this.bgImage})`
			}
		},
		components: {
			scroll,
			SongList,
			Loading
		}
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.music-list
		position: fixed
		z-index: 100
		top: 0
		left: 0
		bottom: 0
		right: 0
		background: $color-background
		.back
			position: absolute
			z-index: 50
			top: 0
			left: 6px
			.icon-back
				display: block
				padding: 10px
				font-size: $font-size-large-x
				color: $color-theme
		.title
			position: absolute
			top: 0
			left: 10%
			z-index: 40
			width: 80%
			no-wrap()
			text-align: center
			line-height: 40px
			font-size: $font-size-large
			color: $color-text
		.bg-images
			position: relative
			width: 100%
			height: 0
			padding-top: 70%
			transform-origin: top
			background-size: cover
		.bg-layer
			position: relative
			height: 100%
			background-color: $color-background
		.list
			position: fixed
			top: 0
			bottom: 0
			width: 100%
			background-color: $color-background
			.song-list-wrapper
				padding: 20px 30px
			.loading-wrapper
				position: absolute
				top: 50%
				transform: translateY(-50%)
				width: 100%
</style>
