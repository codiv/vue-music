/**
 * 状态管理，时时更新状态
 */
import {playMode} from 'common/js/config'
const state = {
    singer: {},
    playing: false, //播放状态：播放（true）、暂停（false）
    fullScreen: false, //全屏：收起、展开
    playlist: [], //播放列表
    sequenceList: [], //歌曲列表（随机、顺序、单曲）
    mode: playMode.sequence, //播放模式
    currentIndex: -1, //当前播放索引（当前播放的首歌下标）
    disc: {},
    toplist: {}
}
export default state