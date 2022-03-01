const http = require('http')
const cl = u => console.log(u)
let server = http.createServer(async(req,res)=>{
    // req.url.replace('/','')
    res.writeHead(200,{ 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('欢迎你啊！'+req.url.replace('/',''))
})
server.listen(8080,()=>cl('nihao!'))