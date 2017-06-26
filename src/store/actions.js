/**
 * 作用：
 * 1.异步操作与修改
 * 2.对mutation封装
 * 使用：
 * 在vue组件里： import {mapActions} from 'vuex'
 * methods: {
 *		...mapActions([
 *			'selectPlay'
 *		])
 *	}
 */
import * as types from './mutation-types'

//封闭定义一个动作：selectPlay（选择播放）
export const selectPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST, list) //提交顺序播放
    commit(types.SET_PLAYLIST, list) //提交播放列表
    commit(types.SET_CURRENT_INDEX, index) //点击的第几首歌
    commit(types.SET_FULL_SCREEN, true) //把播放器打开
    commit(types.SET_PLAYING_STATE, true) //修改播放状态
}