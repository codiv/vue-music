<template>
	<div class="player">
		<div class="normal-polayer">
			播放器
		</div>
		<div class="mini-player"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	
	export default {}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"

	.player
		.normal-polayer
			position: fixed
			left: 0
			right: 0
			top: 0
			bottom: 0
			z-index: 150
			background: $color-background
		.mini-player
			display: flex
			align-items: center
			position: fixed
			left: 0
			bottom: 0
			z-index: 180
			width: 100%
			height: 60px
			background: $color-highlight-background

</style>
