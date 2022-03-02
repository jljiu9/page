const http = require('http')
const cl = u => console.log(u)
const puppeteer = require('puppeteer')
const parseUrl = require('./function')
const dy = require('./dy')
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
    if (req.url.includes('/url=')) {
        let urll = req.url.replace('/url=','')
        if (urll.includes('douyin.com')){
            dy(req,res)
            return
        }
        cl('正在访问：'+parseUrl(urll))
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            // headless: false,
            // slowMo: 10,
        });
        const page = (await browser.pages())[0];
        await page.setViewport({width: 1500, height: 1000});
        await page.goto(parseUrl(urll));
        await page.addScriptTag({path:'src/jquery.js'})
        await page.addStyleTag({path:'src/zhoufang.css'})
        await page.waitForTimeout(100)
        await page.evaluate(() => {
            $('*').css('font-family','cnFont')
        })
        await page.waitForTimeout(5000)
        await page.screenshot().then(function(buffer) {
            // res.setHeader('Content-Disposition', 'attachment;filename="' + urll + '.png"')   //下载图片
            res.setHeader('Content-Type', 'image/png')
            res.end(buffer)
        });
        await browser.close();
        clearInterval(ttime)
        cl('访问完成！'+'用时：'+(st*(0.01)).toFixed(2)+' s')
    }
    // req.url.replace('/','')
    // res.writeHead(200,{ 'Content-Type': 'text/plain; charset=utf-8' })
    // res.end('欢迎你啊！'+req.url.replace('/',''))
})
server.listen(8080,()=>cl('nihao!'))
