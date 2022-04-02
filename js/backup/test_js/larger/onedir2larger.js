const puppeteer = require('puppeteer')
const {jshi,addArrMethod} = require('../../common.js')
const {mkdir} = require('../../fs.js')
const fs = require('fs')
const path = require('path')
const dind = require('./dirindir')
let wait = ms => new Promise((s)=>setTimeout(s, ms))
// upload img to imglarger
let upload2imglarger = async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox','--window-size=1200,800'],
        defaultViewport:null,
        // headless: false,
        slowMo: 10,
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
            let list = await dind('js/源')
            let xiu = await dind('js/修复')
            addArrMethod()
            xiu.f.map(x=>{
                let name = x.split('\\')
                // console.log(name[name.length-2]+'\\'+path.basename(x).split('.')[0])
                list.f.match_del(name[name.length-2]+'\\'+path.basename(x).split('.')[0])
            })
            console.log(list.f)
            let p = 0
            let num = list.f.length
            let larger = async () => {
                let img = list.f[p++]
                // await easyfs(fs.mkdir,path.dirname(img).replace('源','修复'))
                mkdir(path.dirname(img).replace('源','修复'))
                newpage(browser,img,getImg)
                if(p==num){
                    clearInterval(largerr)
                }
            }
            let largerr = setInterval(larger,9000)
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
    let x = setInterval(xxx,100)
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
let newpage = async (browser,u,getImg) => {
    let page = await browser.newPage()
    await page.setDefaultNavigationTimeout(100000)
    await page.goto('https://imglarger.com',{waitUntil:'domcontentloaded'})
    page.on('dialog',async msg => {
        if(msg.message().includes('4000×4000')){
            await msg.dismiss()
            await page.waitForSelector('#file')
            let img = await page.$('#file')
            img.uploadFile(u)
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
        }
        if(msg.message().includes('get')){
            console.log(u+'\n'+msg.message())
            console.log('用时：'+jshi.t())
            await page.close()
            getImg.get(msg.message(),path.dirname(u).replace('源','修复'),path.basename(u).split('.')[0])
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