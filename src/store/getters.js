/**
 * 获取data的映射操作（代理、计算）
 */
export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => { //计算当前播放歌曲
    return state.playlist[state.currentIndex] || 0
}