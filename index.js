const http = require('http')
const cl = u => console.log(u)
let server = http.createServer(async(req,res)=>{
    if (req.url == '/' ){
        res.writeHead(200,{ 'Content-Type': 'text/plain; charset=utf-8' })
        res.end('欢迎！')
        
    }
    res.writeHead(200,{ 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('欢迎你啊！')
})
server.listen(8080,()=>cl('Listing on port 8080'))