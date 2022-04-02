let jshi =  {
    // 计时装置 jshi: jishi
    //要想取消计时，要let xx = jshi.si(),clearInterval(xx)
    s : 0,
    si : () => setInterval(() => {
        jshi.s++
    }, 10),
    t : () => (jshi.s*(0.01)).toFixed(2)
}

//为数组添加一些方法 addArrMethod: add array method 
//使用时先 addArrMethod()
let addArrMethod = () => { 
    // 匹配数组中包含特定字符串的items，并返回items数组
    Array.prototype.match = function (a) {
        let x = []
        this.map(xx => {
            if ( xx.toString().includes(a) ) x.push(xx)
        })
        return x
    }
    // 匹配数组中包含特定字符串的第一项
    Array.prototype.match_first = function (a) {
        let x,p=0
        this.map(xx => {
            if(xx.toString().includes(a) && p<1){
                x = xx
                p++
            }
        })
        return x
    }
    // 匹配数组中包含特定字符串的最后一项
    Array.prototype.match_last = function (a) {
        let x
        this.map(xx => {
            if ( xx.toString().includes(a) ) x = xx
        })
        return x
    }
    // 删除数组中特定的项
    Array.prototype.remove = function (del) {
        this.indexOf(del) !== -1 ? this.splice(this.indexOf(del),1) : 1
        return this
    }   
    // 替换匹配到的第一项
    Array.prototype.replace = function (a,b) {
        this.indexOf(a) !== -1 ? this.splice(this.indexOf(a),1,b) : 1
        return this
    }
    // 替换所有匹配的
    Array.prototype.replaceAll = function (a,b) {
        this.match(a).map(x => this.replace(x,b))
        return this
    }
    // 删除匹配到的第一项
    Array.prototype.match_del = function (a) {
        this.remove(this.match_first(a))
        return this
    }
    // 删除所有匹配的
    Array.prototype.match_delAll = function (a) {
        let temp_list = this.match(a)
        temp_list.map(x => this.remove(x))
        return this
    }
}

module.exports = {jshi,addArrMethod}

// const {jshi,addArrMethod} = require('./common.js')

