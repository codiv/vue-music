<template>
	<transition name="disc">
		<music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
	</transition>
</template>

<script type="text/ecmascript-6">
	import MusicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getSongList} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	import {createSong} from 'common/js/songs'

	export default {
		data() {
			return {
				songs: []
			}
		},
		created() {
			this._getSongList()
		},
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
		methods: {
			_getSongList() {
				if (!this.disc.dissid) {
					this.$router.push('/recommend')
				}
				getSongList(this.disc.dissid).then((res) => {
					if (res.code === ERR_OK) {
						this.songs = this._normalizeSongs(res.cdlist[0].songlist)
					}
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((data) => {
					ret.push(createSong(data))
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


</style>
