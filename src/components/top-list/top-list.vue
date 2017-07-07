<template>
	<transition name="toplist">
		<music-list></music-list>
	</transition>

</template>

<script type="text/ecmascript-6">
	import MusicList from 'components/music-list/music-list'

	export default {
		components: {
			MusicList
		}
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.toplist-enter-active, .toplist-leave-active
		transition: all 0.3s
	.toplist-enter, .toplist-leave-to
		transform: translate3d(100%, 0, 0)

</style>
