const http = require('http')
const cl = u => console.log(u)
let foo = 0
let server = http.createServer(async(req,res)=>{
    let st = 0
    let ttime = setInterval(() => {
        st++
    }, 10)
    if (req.url == '/') {
        cl('第 ' + ++foo + ' 人访问！')
        res.writeHead(200,{ 'Content-Type': 'text/plain; charset=utf-8' })
        res.end('欢迎！')
    }
    // req.url.replace('/','')
    // res.writeHead(200,{ 'Content-Type': 'text/plain; charset=utf-8' })
    // res.end('欢迎你啊！'+req.url.replace('/',''))
})
server.listen(8080,()=>cl('nihao!'))