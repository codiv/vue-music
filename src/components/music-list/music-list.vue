<template>
	<div class="music-list">
		<div class="back" @click="back">
			<i class="icon-back"></i>
		</div>
		<h1 class="title" v-html="title"></h1>
		<div class="bg-images" :style="bgStyle"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	
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
		methods: {
			back() {
				this.$router.back()
			}
		},
		created() {
			console.log(this.bgImage)
		},
		computed: {
			bgStyle() {
				return `background-image:url(${this.bgImage})`
			}
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
</style>
