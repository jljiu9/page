const {easyfs,rename,delFile} = require('../fs.js')
const fs = require('fs')
const path = require('path')
// 遍历当前目录下的所有文件（递归）
let dind = async (h) => {
    let isfile = []
    let isdir = []
    let did = async (h) => {
        let filelist = await easyfs(fs.readdir,h)
        for (let file of filelist) {
            let curpath = path.resolve(h,file)
            let f = await easyfs(fs.stat,curpath)
            let a = f.isFile() !== true
            if (a) {
                isdir.push(curpath)
                await did(curpath)
            }
            !a ? isfile.push(curpath) : 1
        }
        return {f:isfile,d:isdir}
    };
    return await did(h)
};

// (async()=>{
//     let list = await dind('js/ppp')
//     console.log('文件夹：')
//     let foo = list.f[0]
//     console.log(path.dirname(foo))
//     console.log(path.basename(foo))
//     console.log('文件：')
//     console.log(list.f)
// })()

module.exports = dind
