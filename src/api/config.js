export const commonParams = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
}

export const options = {
    param: 'jsonpCallback'
}

export const optionsJpn = { //解决获取数据出错问题“jp1 is not defined”
    param: 'jsonpCallback',
    prefix: 'playlistinfoCallback'
}

export const ERR_OK = 0