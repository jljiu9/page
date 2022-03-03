const puppeteer = require('puppeteer')

const dy = async (req,res) => {
    let st = 0
    let ttime = setInterval(() => {
        st++
    }, 10);
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // headless: false,
        // slowMo: 10,
    });
    const page = (await browser.pages())[0]
    await page.setViewport({width: 1200, height: 1000,deviceScaleFactor:1.5,isMobile:true})
    page.setDefaultNavigationTimeout(0)
    await page.goto('https://www.douyin.com/user/MS4wLjABAAAAGmwgghQsE6VOMgVBwtNuaNxejrYCifTgIRKH4xlxa0s')
    await page.addScriptTag({path:'src/jquery.js'})
    page.on('dialog',async msg => {
        console.log(msg.message())
        await msg.dismiss()
        // await page.screenshot({path: 'douyin.png', fullPage:true});
        await page.screenshot({fullPage:true}).then(function(buffer) {
            // res.setHeader('Content-Disposition', 'attachment;filename="' + urll + '.png"');
            res.setHeader('Content-Type', 'image/png')
            res.end(buffer)
        });
        clearInterval(ttime)
        console.log('访问抖音用时：'+(st*(0.01)).toFixed(2)+' s')
        await browser.close()
    })
    await page.evaluate(() => {
        document.body.style.zoom = 1.3
        const stm = async(ms,ds) => setTimeout(ds,ms*10)
        const cl =async u => console.log(u)
        const interval = {
            str : {f:0},
            paces : (a,b,c) => {
                interval.str.ds = a
                interval.str.dselse = b
                interval.str.bb = c
            },
            forTime : async() => {
                stm(4,async()=>{
                        if(1){
                            interval.str.f++;
                            (async()=>{await interval.str.ds()                       
                            if(interval.str.bb()) {
                                interval.forTime()
                                return
                            };
                            await interval.str.dselse()})();
                        }
                    })
            },
            p : (ds,dselse,bb)=>{
                interval.forTime(interval.paces(ds,dselse,bb))
            }
        };
        let pace = 40
        let old,newer,newest
        let down = () => {
            old = window.scrollY;//保存当前到顶距离
            newer = old + pace;//保存最新到顶距离
            window.scroll({top: newer,left: 0})
            newest = window.scrollY//保存最终到顶距离
        }
        let web = async () => {
            interval.p(async()=>{
                down()
            },async()=>{
                let url = []
                $('div>ul>li>a').has('img').each(function(){
                    url.push($(this).attr('href'));
                });
                $('header').parent().remove() //删除头部导航栏
                $('.login-guide-container').remove() //删除登录二维码
                $('footer').remove()    //删除页脚
                alert(url)
            },()=>newest == newer)  //跳出递归的条件
        };
        web()
    });
}
// dy()

module.exports = dy