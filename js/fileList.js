const cl = u => console.log(u)
const wait2do = (rpt,then,cdt,ms=20) => {
    let down = () => {
        rpt()
        if(cdt()){
            clearInterval(godown)
            then()
        }
    }
    let godown = setInterval(down,ms*100)
}
const {jshi} = require('./common.js')
const fileList = async (path='js',ms=10) => {
    let tt = jshi.si()
    const {easyfs} = require('./fs.js')
    const fs = require('fs')
    let list = await easyfs(fs.readdir,path)
    let num = list.length
    let p = 0
    wait2do(()=>cl(list[p++]),()=>{cl("完成！"+jshi.t());clearInterval(tt)},()=>p==num,ms)
}
// fileList('js/pic')
