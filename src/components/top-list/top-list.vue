<template>
	<transition name="toplist">
		<music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
	</transition>

</template>

<script type="text/ecmascript-6">
	import MusicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getMusicList} from 'api/rank'
	import {ERR_OK} from 'api/config'
	import {createSong} from 'common/js/songs'

	export default {
		data() {
			return {
				songs: [],
				rank: true
			}
		},
		created() {
			this._getMusicList()
		},
		methods: {
			_getMusicList() {
				if (!this.toplist.id) {
					this.$router.push('/rank')
					return
				}
				getMusicList(this.toplist.id).then((res) => {
					if (res.code === ERR_OK) {
						this.songs = this._normalizeSongs(res.songlist)
					}
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((item) => {
					const musicData = item.data
					if (musicData.songid && musicData.albummid) {
						ret.push(createSong(musicData))
					}
				})
				return ret
			}
		},
		computed: {
			title() {
				return this.toplist.topTitle
			},
			bgImage() {
				return this.songs.length ? this.songs[0].image : '' //取第一首歌的图片做为封面
			},
			...mapGetters([
				'toplist'
			])
		},
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
