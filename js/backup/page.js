const puppeteer = require('puppeteer');
let jshi =  {  // 计时装置 jshi: jishi
    s : 0,
    si : () => setInterval(() => {
        jshi.s++
    }, 10),
    t : () => (jshi.s*(0.01)).toFixed(2)
};
// upload img to imglarger
(async()=>{
    jshi.si()
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox','--window-size=1200,800'],
        headless: false,
        slowMo: 10,
    })
    const page = (await browser.pages())[0]
    await page.setViewport({width: 1200, height: 800});
    await page.goto('https://imglarger.com/Login')
    page.on('dialog',async msg => {
        console.log(msg.message())
        console.log('用时：'+jshi.t())
        if (msg.message() == 'Login Successfully!') {
            await msg.dismiss()
            // await page.waitForTimeout(3000)
            await page.waitForNavigation({waitUntil:'domcontentloaded'})
            // await page.click('.header-btns')
            // await page.waitForSelector('#file')
            await page.evaluate(()=>{
                let down = () => {
                    if(document.querySelector('#restriction').innerText.includes('4000×4000')){
                        clearInterval(godown)
                        alert(document.querySelector('#restriction').innerText)
                        console.log(document.querySelector('#restriction').innerText)
                    }
                }
                let godown = setInterval(down,100)
            })
            
        }
        if(msg.message().includes('4000×4000')){
            await msg.dismiss()
            let img = await page.$('#file')
            img.uploadFile('./js/c90fef63c25a95a.jpg')
            // await page.waitForTimeout(2000)
            await page.waitForSelector('.select')
            let sel = await page.$eval('.select',(n)=>{
                n.value = 4
                console.log(n.value)
                return n.value
            })
            console.log('放大倍数'+sel)
            let btn = await page.waitForSelector('.btn-Start-Button')
            await btn.click()
            // await page.click('.btn-Start-Button')
            // await page.waitForTimeout(3000)
            // try{
            //     let stat = await page.$eval('.error_gif',(n)=>{
            //         return n.outerHTML
            //     })
            //     console.log(stat)
            // }catch(e){
            //     console.log(e.message)
            // }
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
            console.log('用时：'+jshi.t())
        }
        if(msg.message().includes('get')){
            // console.log(msg.message())//+'_4x.jpg'
            await page.close()
        }
        // await browser.close()
    })
    // page.on('console',async(msg)=>{
        
    // })
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
    // const page = await browser.newPage()

})()