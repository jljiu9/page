const puppeteer = require('puppeteer')
const {jshi} = require('../../common.js')
const {easyfs} = require('../../fs.js')
const fs = require('fs')
let wait = ms => new Promise((s)=>setTimeout(s, ms))

// upload img to imglarger
let upload2imglarger = async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox','--window-size=1200,800'],
        // defaultViewport:null,
        // headless: false,
        slowMo: 10,
    })
    console.log(browser['_connection']['_closed'])
    browser.on('disconnected',()=>{
        console.log('浏览器被关闭！')
    })
    check(browser)
}
let tt = jshi.si()
upload2imglarger()
let check = async (browser) => {
    if((await browser.pages())[0].url()=='about:blank'){
        login(browser)
    }
    let page = (await browser.pages())[0]
    page.on('dialog',async(msg)=>{
        if (msg.message() == 'Login Successfully!') {
            let {getImg} = await import('../../getImg.mjs')
            let path = '绝对领域'
            let fileList = await easyfs(fs.readdir,'js/源/'+path)
            await easyfs(fs.mkdir,'js/修复/'+path)
            let num = fileList.length
            let p = 0
            let down = () => {
                let img = fileList[p++]
                let kk = p == num
                newpage(browser,img,getImg,path,kk)
                if(p==num){
                    clearInterval(godown)
                }
            }
            let godown = setInterval(down,7000)
        }else{
            return
        }
    })
    await wait(20000)
    let xp = 0
    let xxx = async () => {
        if((await browser.pages()).length == 1){
            clearInterval(x)
            await browser.close()
            clearInterval(tt)
        }
    }
    let x = setInterval(xxx,1000)
}
let login = async (browser) => {
    let page = (await browser.pages())[0]
    await page.goto('https://imglarger.com/Login')
    page.on('dialog', async (msg)=>{
        if (msg.message() == 'Login Successfully!') {
            await msg.dismiss()
        }else{
            console.log('登入失败！')
            return
        }
    })
    let user = {
        email:'88pxazjpak@mc5.email',
        passport:'3w112233'
    }
    await page.type('#user_name',user.email)
    await page.type('#password',user.passport)
    await page.click('#login')
}
let newpage = async (browser,u,getImg,path,kk) => {
    let page = await browser.newPage()
    await page.goto('https://imglarger.com',{waitUntil:'domcontentloaded'})
    page.on('dialog',async msg => {
        if(msg.message().includes('4000×4000')){
            await msg.dismiss()
            await page.waitForSelector('#file')
            let img = await page.$('#file')
            img.uploadFile('js/源/'+path+'/'+u)
            await page.waitForSelector('.select')
            await page.$eval('.select',(n)=>{
                n.value = 4
                console.log(n.value)
                return n.value
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
            // console.log('用时：'+jshi.t())
        }
        if(msg.message().includes('get')){
            console.log(u+'\n'+msg.message()+'\n'+kk)
            console.log('用时：'+jshi.t())
            await page.close()
            getImg.get(msg.message(),'js/修复/'+path,u.split('.')[0])
        }
    })
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