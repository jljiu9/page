const {promisify} = require('util')
const fs = require('fs')
const path = require('path')

const cl = u => console.log(u)
let fsAsync = async (u) => {
  return async(...theArgs)=>{
    let data,err
    await promisify(u)(...theArgs).then((d)=>data=d).catch((e)=>err = e.message)
    let n = data == undefined ? err : data
    data == undefined && data !==err ? cl(err) : 1   //只输出错误
    // n == undefined ? cl('Nothing here!') : cl(n)  //有数据输出数据，有错误输出错误，都没有输出Nothing here!
    return n == undefined ? 'Nothing here' : n
  }
}
let easyfs = async (u,...m) => {
  let xx = await fsAsync(u)
  return await xx(...m)
}

// 删除特定文件
let delFile = async (incl,dir='.') => {
  if (dir !== '.') {
    (await dind(dir)).f.map( x => {
      if ( path.basename(x).includes(incl) ) fs.unlinkSync(x)
    })
  }else{
    fs.readdirSync('.').map( x => {
      if (fs.statSync(x).isFile() && path.basename(x).includes(incl)) fs.unlinkSync(x)
    })
  }
}
// 文件重命名
let rename = async (old,inside,dir='.') => {
  if (dir !== '.') {
    (await dind(dir)).f.map( x => {
      if ( path.basename(x).includes(old) ) fs.renameSync(x,x.replace(old,inside))
    })
  }else{
    fs.readdirSync('.').map( x => {
      if (fs.statSync(x).isFile() && path.basename(x).includes(old)) fs.renameSync(x,x.replace(old,inside))
    })
  }
}
// 创建多级目录
let mkdir = async dir => {
  if (fs.existsSync(dir)) {
    return true
  }
  if (mkdir(path.dirname(dir))) {
      fs.mkdirSync(dir)
      return true
  }
}
// 删除文件夹（带文件的文件夹）
let delDir = async dir => {
  if (fs.statSync(dir).isDirectory()) {
    let list = fs.readdirSync(dir)
    for(let i = 0; i < list.length; i++ ) {
        delDir(path.join(dir, list[i]))
    }
    fs.rmdirSync(dir)
  } else {    
    fs.unlinkSync(dir)
  }
}
// 遍历当前目录下的所有文件（递归）
let dind = async dir => {
  let isfile = []
  let isdir = []
  let did = async dir => {
    fs.readdirSync(dir).map(async x => {
      let curpath = path.resolve(dir,x)
      if (fs.statSync(curpath).isFile()) isfile.push(curpath)
      else{
        isdir.push(curpath)
        await did(curpath)
      }
    })
    return {f:isfile,d:isdir}
  }
  return await did(dir)
}

module.exports = {easyfs,delFile,rename,mkdir,delDir,dind}

