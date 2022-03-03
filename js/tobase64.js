const { Buffer } = require('buffer')
const fs = require('fs')

let font = u => fs.readFile(u,(err,data)=>{
  const buf = Buffer.from(data)
  let base = 'data:application/font-tiff;charset=utf-8;base64,'+buf.toString('base64')
  fs.writeFile(`${u}.txt`,base,()=>{})
})
let img = u => fs.readFile(u,(err,data)=>{
  const buf = Buffer.from(data)
  let base = 'data:image/png;base64,'+buf.toString('base64')
  fs.writeFile(`${u}.txt`,base,()=>{})
})
let toimg = u => fs.readFile(u,'utf-8',(err,data)=>{
  // let buf = Buffer.from(data)
  // data = buf.toString().replace('data:image/png;base64,','')
  // fs.writeFile(`${u.replace('.txt','')}.png`,Buffer.from(data,'base64'),()=>{})
  data = data.replace('data:image/png;base64,','')
  fs.writeFile(`${u.replace('.txt','')}.png`,Buffer.from(data,'base64'),()=>{})
})

let tobase64 = (u,s='img') => {
    s == 'font' ? font(u) : img(u)
}
// tobase64('./js/download.png')
// toimg('./js/download.png.txt')