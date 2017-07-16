/**
 * 储存
 */
import storage from 'good-storage' //s本地储存插件

const SEARCH_KEY = '__search__' //搜索
const SEARCH_MAX_LEN = 15 //最大储存条数

/*
 * insertArray（）方法：
 * 如果数组超过最大条数，则删除最后一条数据
 * 如果有重复的数据，则删除。
 * 最新的搜索数据都是在第一条
 * arr：存储的数组
 * val：存储的值
 * compare：比较函数
 * maxLen：最大储存条数
 * */
function insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare) //compare是一个函数
    if (index === 0) { //等于0说明是第一条数据
        return
    }
    if (index > 0) {
        arr.splice(index, 1) //删除这条数据
    }
    arr.unshift(val) //向数组的开头添加一个或更多元素，并返回新的长度。
    if (maxLen && arr.length > maxLen) {
        //删除最后一条数据
        arr.pop() //用于删除并返回数组的最后一个元素。
    }
}

//搜索储存
export function saveSearch(query) {
    /*
     * storage.get(key, def)
     * key：存储的key值
     * def：默认
     * */
    const searches = storage.get(SEARCH_KEY, []) //获取数据，如果没有，返回“[]”空数据
    insertArray(searches, query, (item) => {
        return item === query
    }, SEARCH_MAX_LEN)
    storage.set(SEARCH_KEY, searches) //保存
    return searches
}

export function loadSearch() {
    return storage.get(SEARCH_KEY, [])
}