<template>
	<transition name="slide">
		<music-list></music-list>
	</transition>
</template>

<script type="text/ecmascript-6">
	import MusicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	
	export default {
		computed: {
			...mapGetters([
				'singer'
			])
		},
		created() {
			console.log(this.singer)
		},
		components: {
			MusicList
		}
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.slide-enter-active, .slide-leave-active
		transition: all 0.4s
	.slide-enter, .slide-leave-to
		transform: translate3d(100%, 0, 0)

</style>
