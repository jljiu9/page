const puppeteer = require('puppeteer');
const {jshi} = require('../../common.js');
(async()=>{
    let tt = jshi.si()
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox','--window-size=1200,800'],
        defaultViewport:null,
        headless: false,
        slowMo: 10,
    })
    browser.on('disconnected',()=>{
        console.log('浏览器已关闭！')
    })
    const page = (await browser.pages())[0]
    await page.goto('https://imglarger.com/Login')
    page.on('dialog',async msg => {
        console.log(msg.message())
        console.log('用时：'+jshi.t())
        if (msg.message() == 'Login Successfully!') {
            await msg.dismiss()
            await page.waitForNavigation({waitUntil:'domcontentloaded'})
            await page.waitForSelector('#file')
            let img = await page.$('#file')
            img.uploadFile('js/pic/001.jpg')
            await page.waitForSelector('.select')
            await page.$eval('.select',(n)=>{
                n.value = 4
            })
            let btn = await page.waitForSelector('.btn-Start-Button')
            await btn.click()
            await page.evaluate(()=>{
                let down = () => {
                    if(document.querySelector('.preview-image').href.includes('get.imglarger')){
                        clearInterval(godown)
                        alert(document.querySelector('.preview-image').href)
                        console.log(document.querySelector('.preview-image').href)
                    }
                }
                let godown = setInterval(down,100)
            })
        }
        if (msg.message().includes('get') ){
            await browser.close()
            clearInterval(tt)
        }
    })
    let login = async () => {
        let user = {
            email:'ruomkihlc@mc5.email',
            passport:'3w112233'
        }
        await page.type('#user_name',user.email)
        await page.type('#password',user.passport)
        await page.click('#login')
    }
    login()
    let uploadfile = async () => {
        let img = await page.$('#file')
        img.uploadFile('./js/c90fef63c25a95a.jpg')
    }
})()