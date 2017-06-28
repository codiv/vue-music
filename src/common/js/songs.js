/**
 * Created by codiv on 2017/6/21.
 */
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

function filterSinger(singer) {
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/') //join()把数组中的所有元素放入一个字符串，并用‘/’分隔数组中的元素
}