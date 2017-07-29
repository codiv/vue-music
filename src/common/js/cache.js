/**
 * 储存
 */
import storage from 'good-storage' //本地储存插件

const SEARCH_KEY = '__search__' //搜索
const SEARCH_MAX_LEN = 15 //最大储存条数

const PLAY_KEY = '__play__' //播放历史
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__' //歌曲收藏
const FAVORITE_MAX_LEN = 200

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

function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare)
    if (index > -1) {
        arr.splice(index, 1)
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

//取得历史上搜索中的所有数据
export function loadSearch() {
    return storage.get(SEARCH_KEY, [])
}

//删除历史搜索列表中的单条记录
export function deleteSearch(query) {
    const searches = storage.get(SEARCH_KEY, [])
    deleteFromArray(searches, (item) => {
        return item === query
    })
    storage.set(SEARCH_KEY, searches) //保存
    return searches
}

export function clearSearch() {
    storage.remove(SEARCH_KEY)
    return []
}

//储存播放历史歌曲
export function savePlay(song) {
    const songs = storage.get(PLAY_KEY, [])
    insertArray(songs, song, (item) => {
        return item.id === song.id
    }, PLAY_MAX_LEN)
    storage.set(PLAY_KEY, songs) //保存
    return songs
}

export function loadPlay() {
    return storage.get(PLAY_KEY, [])
}

//保存收藏歌曲
export function saveFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    insertArray(songs, song, (item) => {
        return item.id === song.id
    }, FAVORITE_MAX_LEN)
    storage.set(FAVORITE_KEY, songs)
    return songs
}

//删除收藏歌曲
export function deleteFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    deleteFromArray(songs, (item) => {
        return item.id === song.id
    })
    storage.set(FAVORITE_KEY, songs)
    return songs
}

//获取收藏歌曲
export function loadFavorite() {
    return storage.get(FAVORITE_KEY, [])
}
