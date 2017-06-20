/**
 * Created by codiv on 2017/6/20.
 */
import * as types from './mutation-types' //"*"是整体导入

const matutation = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    }
}

export default matutation
