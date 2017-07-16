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
    /*
    * 报错：
    * Error: [vuex] Do not mutate vuex store state outside mutation handlers.
    * 意思是：不要在我们mutation的回调函数之外修改
    *因为在这里我们需要修改playlist与sequenceList，而这两个只能在mutation里修改
    *所以，在这里我们需要用slice() 方法来复制一个副本出来操作
    * */
    let playlist = state.playlist.slice() //播放列表
    let sequenceList = state.sequenceList.slice() //歌曲列表（随机、顺序、单曲）
    let currentIndex = state.currentIndex //当前播放索引（当前播放的首歌下标）
    //记录当前的歌曲
    let currentSong = playlist[currentIndex]
    /*
     * 查找当前列表中是否有待插入的歌曲并返回其索引
     *在列表中，找到传进来的歌曲（song）并返回索引，如果没有返回-1
     * 注意：
     * findIndex(playlist, song) 一定要在playlist.splice(currentIndex, 0, song)的前面
     * */
    let fpIndex = findIndex(playlist, song)
    //因为是插入歌曲，所以索引+1，而且插入在当前歌曲的下一位
    currentIndex++
    /*
     *splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
     * 使用：
     * arrayObject.splice(index,howmany,item1,.....,itemX)
     * index：必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置
     * howmany：必需。要删除的项目数量。如果设置为 0，则不会删除项目。
     * item1, ..., itemX	可选。向数组添加的新项目。
     * */
    playlist.splice(currentIndex, 0, song) //添加song到playlist
    // 如果已经包含了这首歌，则删除包含的这首歌曲
    if (fpIndex > -1) {
        if (currentIndex > fpIndex) { //如果歌曲是在当前播放歌曲的前面
            playlist.splice(fpIndex, 1) //删除包含的这首歌曲
            currentIndex--
        } else {
            playlist.splice(fpIndex + 1, 1)
        }
    }

    //歌曲列表中：插入到当前播放的歌曲的下一首
    let currentSIndex = findIndex(sequenceList, currentSong) + 1

    let fsIndex = findIndex(sequenceList, song)

    sequenceList.splice(currentSIndex, 0, song) //注意：必须在获得fsIndex下面执行

    if (fsIndex > -1) {
        if (currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1)
        } else {
            sequenceList.splice(fsIndex + 1, 1)
        }
    }

    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}
