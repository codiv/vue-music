/**
 * 作用：
 * 1.异步操作与修改
 * 2.对mutation封装
 * 使用：
 * 在vue组件里： import {mapActions} from 'vuex'
 * methods: {
 *     selectItem(item, index) {
 *			this.selectPlay({
 *				list: this.songs,
 *				index
 *			})
 *		},
 *		...mapActions([
 *			'selectPlay'
 *		])
 *	}
 */
import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

//封闭定义一个动作：selectPlay（选择播放）
function findIndex(list, song) { //点击的歌曲与随机播放歌曲列表相对应
    return list.findIndex((item) => {
        return item.id === song.id
    })
}
export const selectPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST, list) //提交顺序播放
    if (state.mode === playMode.random) {
        //解决：当播放为“随机播放”模式时，点击"music-list"歌曲页面中的某条歌曲对不上号的问题
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST, randomList) //提交播放列表
        index = findIndex(randomList, list[index])
    } else {
        //“顺序播放”模式的时候
        commit(types.SET_PLAYLIST, list) //提交播放列表
    }
    commit(types.SET_CURRENT_INDEX, index) //点击的第几首歌
    commit(types.SET_FULL_SCREEN, true) //把播放器打开
    commit(types.SET_PLAYING_STATE, true) //修改播放状态
}

//点击"music-list"歌曲页面中的“随机播放”
export const randomPlay = function ({commit}, {list}) {
    commit(types.SET_PLAY_MODE, playMode.random) //播放模式
    commit(types.SET_SEQUENCE_LIST, list) //提交顺序播放
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList) //提交播放列表
    commit(types.SET_CURRENT_INDEX, 0) //点击的第几首歌
    commit(types.SET_FULL_SCREEN, true) //把播放器打开
    commit(types.SET_PLAYING_STATE, true) //修改播放状态
}

export const insertSong = function ({commit, state}, song) {
    let playlist = state.playlist //歌曲列表
    /*
     * 查找当前列表中是否有待插入的歌曲并返回其索引
     *在列表中，找到传进来的歌曲（song）并返回索引，如果没有返回-1
     * */
    let fpIndex = findIndex(playlist, song)
    console.log(fpIndex)
    console.log(playlist)
    console.log(song)
}