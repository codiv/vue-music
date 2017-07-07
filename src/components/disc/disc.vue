<template>
	<transition name="disc">
		<music-list :title="title" :bg-image="bgImage"></music-list>
	</transition>
</template>

<script type="text/ecmascript-6">
	import MusicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'

	export default {
		computed: {
			title() {
				return this.disc.dissname
			},
			bgImage() {
				return this.disc.imgurl
			},
			...mapGetters([
				'disc'
			])
		},
		components: {
			MusicList
		}
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">


</style>
