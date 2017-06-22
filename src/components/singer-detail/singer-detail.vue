<template>
	<transition name="slide">
		<music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
	</transition>
</template>

<script type="text/ecmascript-6">
	import MusicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from 'api/singer'
	import {createSong} from 'common/js/songs'
	import {ERR_OK} from 'api/config'

	export default {
		computed: {
			title() {
				return this.singer.name
			},
			bgImage() {
				return this.singer.avatar
			},
			...mapGetters([
				'singer'
			])
		},
		data() {
			return {
				songs: []
			}
		},
		created() {
			this._getDetail()
		},
		methods: {
			_getDetail() {
				if (!this.singer.id) {
					this.$router.push('/singer')
					return
				}
				getSingerDetail(this.singer.id).then((res) => {
					if (res.code === ERR_OK) {
						this.songs = this._normalizeSongs(res.data.list)
					}
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((item) => {
					let {musicData} = item //取得item中的每一项musicData数据
					if (musicData.songid && musicData.albummid) {
						ret.push(createSong(musicData))
					}
				})
				return ret
			}
		},
		components: {
			MusicList
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.slide-enter-active, .slide-leave-active
		transition: all 0.3s
	.slide-enter, .slide-leave-to
		transform: translate3d(100%, 0, 0)
</style>