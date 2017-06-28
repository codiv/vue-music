/**
 * Created by codiv on 2017/6/8.
 */

//判断样式是否存在
export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

//添加样式
export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

// 读、取自定义属性带前缀data-的值
export function getData(el, name, val) {
    const prefix = 'data-'
    //如果val有值则执行setAttribute设置属性与值
    if (val) {
        return el.setAttribute(prefix + name, val)
    }
    return el.getAttribute(prefix + name)
}

//浏览器的前缀处理
let elementStyle = document.createElement('div').style

// vendor返回值为：webkit、Moz、O、ms、standard（其中一个）
let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }

    return false
})()//立执行函数

export function prefixStyle(style) {
    if (vendor === false) {
        return
    }
    /*
    * charAt()可返回指定位置的字符。
    * toUpperCase() 方法用于把字符串转换为大写。
    * style.charAt(0).toUpperCase()：首字母大写
    * */
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
