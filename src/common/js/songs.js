/**
 * Created by codiv on 2017/6/21.
 */
import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
    constructor({id, mid, singer, name, album, duration, image, url}) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }

    getLyric() {
        /*
         * 性能优化：为了避免都请求歌词，进行优化
         * （代码对比请查看github中的26_playing_lyric_config分支里的两个节点）
         * */
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }

        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                /*
                 *把类似于JSONPCallback的数据进行处理
                 * 数据（res）：
                 * "MusicJsonCallback({\"retcode\":0,\"code\":0,\"subcode\":0,\"lyric\":\"})"
                 *对res进行处理，这个处理可以放在dev-sever.js里进行
                 * 做法如下：
                 * 1.先用正则表达处理，进行分组，得出“matches”
                 * 2.取出所需的数据，得出matches[1]
                 * 3.对数据（matches[1]） JSON字符串进行解析
                 *
                 *  */
                if (typeof res === 'string') {
                    let reg = /^\w+\(({[^()]+})\)/
                    let matches = res.match(reg)
                    if (matches) {
                        res = JSON.parse(matches[1]) //JSON.parse()方法解析一个JSON字符串
                    }
                }
                if (res.retcode === ERR_OK) {
                    this.lyric = Base64.decode(res.lyric)
                    resolve(this.lyric)
                } else {
                    reject('no lyric') //没有歌词
                }
            })
        })
    }
}

export function createSong(data) {
    return new Song({
        id: data.songid,
        mid: data.songmid,
        singer: filterSinger(data.singer),
        name: data.songname,
        album: data.albumname,
        duration: data.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${data.albummid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/${data.songid}.m4a?fromtag=46`
    })
}

export function filterSinger(singer) {
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/') //join()把数组中的所有元素放入一个字符串，并用‘/’分隔数组中的元素
}