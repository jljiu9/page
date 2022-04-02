// 模块引入
const fs = require('fs')
// const {easyfs,rename,,mkdir,delDir} = require('./fs.js');


// 函数
let cl = u => console.log(u)
let wait = ms => new Promise((s)=>setTimeout(s, ms))


// 捕获异常
try{

}catch(e){
    cl(e.message)
}
// 异步
(async()=>{
    
})()


// 测试
(async()=>{
    // await easyfs(fs.mkdir,'hh/kk/ll')
    // mkdir('hh/kk/ll')
    // await rename('txt','hhh','js/backup')
    cl(fs.readdirSync('js/backup'))
    await wait(2000)
})()
