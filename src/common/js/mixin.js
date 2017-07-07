/**
 * 组件共用代码
 */
import {mapGetters} from 'vuex'

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
    method: { //如果vue组件未定义handlePlayList()则抛出以下错误提示
        handlePlayList() {
            throw new Error('component must implement handlePlaylist method')
        }
    }
}
