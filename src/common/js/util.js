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

/*
 * 截流函数
 * 作用：
 * 延迟操作、派发、执行等
 * 延迟执行传过来的函数（func）
 * */
export function debounce(func, delay) {
    let timer

    return function (...args) { //
        if (timer) {
            clearTimeout(timer) //清除定时器
        }
        /*
         * apply方法：
         * 语法：apply([thisObj[,argArray]])
         * 定义：应用某一对象的一个方法，用另一个对象替换当前对象。
         * 说明：
         * 如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。
         * 如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。
         * */
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
