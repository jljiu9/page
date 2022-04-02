import fetch from 'node-fetch';
import fs from 'fs'
import path from 'path'

const zero = (u,z) => {    //补零
    let len = u.toString().length
    if (len<=z) {
        return '0'.repeat(z-len)+u
    }
    throw '需求位数小于实际位数'
}
const getImg = {
  p : 1,
  url : (u) => {
    let a = new URL(u)
    let ext = path.extname(a.pathname)
    let base = path.basename(a.pathname)
    return ext == '' ? base : path.basename(a.pathname,ext)
  },
  get : async (i,pt='.',aa=1) => {
    let a = new URL(i)
    let e = path.extname(a.pathname)
    let base = path.basename(a.pathname)
    let name1 = e == '' ? base : path.basename(a.pathname,e)
    let res = await fetch(i)
    let ext = res.headers.get('content-type').split('/')[1]
    let name = e == '' ? `${zero(getImg.p++,2)}` : name1
    aa !== 1 ? (name = aa) : 1
    res.body.pipe(fs.createWriteStream(`${pt}/`+name+'.'+ext))
  },
  fetch : async (url,pt='') => {  // 网络地址、"本地路径+文件名"
    url = new URL(url)
    let
      url_ext = path.extname(url.pathname),  // 后缀名
      // url_base = path.basename(url.pathname),  // 文件名+后缀名
      url_name = path.basename(url.pathname,url_ext), // 文件名
      res = await fetch(url), // 获取图片
      ext = res.headers.get('content-type').split('/')[1], // 获取网络地址上的图片格式
      pt_name,pt_ext,pt_dir,pt_base
    if (pt !== '') {
      pt_ext = path.extname(pt),
      pt_base = path.basename(pt),
      pt_name = path.basename(pt,pt_ext),
      pt_dir = path.dirname(pt)
    }
    if (pt == '') {
      pt_dir = '.'
      pt_name = url_name
      pt_ext = '.'+ext
    }
    if (pt_ext == '') pt_ext = '.'+ext
    if (pt == 'num') pt_name = zero(getImg.p++,2) // 以数字命名
    let address = pt_dir+'\\'+pt_name+pt_ext
    console.log(address)
    res.body.pipe(fs.createWriteStream(address))
  },
  list : (text) => {
    let $ = cheerio.load(text)
    let imgList = []
    $('img').each(function(){
      let img = $(this).attr('data-src')
      imgList.push(img)
    })
    return imgList
  }
}
export {getImg}
// module.exports = getImg



// let img = 'http://get.imglarger.com:8889/results/f189VxBF_2x.jpg'
// getImg.fetch(img,'d:\\github\\page\\js\\test\\1\\E8-6foUVcAMpNaA.jpg')