/**
 * 功能组件
 * shuffle()：数组的打乱
 */
export function shuffle(arr) {
    /*
    * let _arr = arr.slice() 说明：
    * 解决：当播放为“随机播放”模式时，点击"music-list"歌曲页面中的某条歌曲对不上号的问题
    * slice()：该方法是对数组进行部分截取，并返回一个数组副本，不会改变原来的数组
    * 原因：因为shuffle()方法有多个处用到，为了让提交进来的“arr（数据）”不遭到破坏（保持一至），
    * 所以用slice()方法复制一个“_arr”数组副本出来修改，并不是对传进的"arr"原数组修改
    * */
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0, i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
