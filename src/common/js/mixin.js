/**
 * 组件共用代码
 */
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    mounted() { //dom reader ---el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
        this.handlePlayList(this.playlist)
    },
    activated() { //kitbeline 切换时触发的activated
        this.handlePlayList(this.playlist)
    },
    watch: {
        playlist(newval) {
            this.handlePlayList(newval)
        }
    },
    method: {
        handlePlayList() { //如果vue组件未定义handlePlayList()则抛出以下错误提示
            throw new Error('component must implement handlePlaylist method')
        }
    }
}

export const playerMixin = {
    computed: {
        iconMode() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        },
        ...mapGetters([
            'sequenceList', //歌曲列表（随机、顺序、单曲）
            'currentSong', //当前歌曲
            'playlist', //播放列表
            'mode', //播放模式
            'favoriteList' //收藏歌曲
        ])
    },
    methods: {
        getFavoriteIcon(song) {
            if (this.isFavorite(song)) {
                return 'icon-favorite'
            }
            return 'icon-not-favorite'
        },
        toggleFavorite(song) {
            if (this.isFavorite(song)) {
                this.deleteFavoriteList(song)
            }
            this.saveFavoriteList(song)
        },
        isFavorite(song) {
            const index = this.favoriteList.findIndex((item) => {
                return item.id === song.id
            })
            return index > -1
        },
        changeMode() {
            const mode = (this.mode + 1) % 3 //3取余
            this.setPlayMode(mode)
            let list = null
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList)
            } else {
                list = this.sequenceList
            }
            this.resetCurrentIndex(list) //解决：切换播放模式时，当前正在播放的歌曲不在发生改变
            this.setPlayList(list)
        },
        resetCurrentIndex(list) {
            let index = list.findIndex((item) => {
                return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
        },
        ...mapMutations({
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAYLIST',
            setPlayingState: 'SET_PLAYING_STATE'
        }),
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList'
        ])
    }
}

export const searchMixin = {
    data() {
        return {
            query: '',
            refreshDelay: 120
        }
    },
    methods: {
        addQuery(query) {
            this.$refs.searchBox.setQuery(query)
        },
        onQueryChange(query) {
            this.query = query
        },
        blurInput() {
            this.$refs.searchBox.blur()
        },
        saveSearch() {
            this.saveSearchHistory(this.query) //把搜索框的值进行储存
        },
        ...mapActions([
            'deleteSearchHistory',
            'saveSearchHistory'
        ])
    },
    computed: {
        ...mapGetters([
            'searchHistory'
        ])
    }
}