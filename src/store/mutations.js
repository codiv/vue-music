/**
 * Created by codiv on 2017/6/20.
 */
import * as types from './mutation-types' //"*"是整体导入

const matutation = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    },
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state, list) {
        state.playlist = list
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_DISC](state, disc) {
        state.disc = disc
    },
    [types.SET_TOP_LIST](state, list) {
        state.toplist = list
    },
    [types.SET_SEARCH_HISTORY](state, history) {
        state.searchHistory = history
    },
    [types.SET_PLAY_HISTORY](state, history) {
        state.playHistory = history
    },
    [types.SET_FAVORITE_LIST](state, history) {
        state.favoriteList = history
    }
}

export default matutation
