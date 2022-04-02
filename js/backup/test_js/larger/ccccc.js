const puppeteer = require('puppeteer')
const {jshi,addArrMethod} = require('../../../common.js')
const {mkdir} = require('../../../fs.js')
const fs = require('fs')
const path = require('path')
const dind = require('../../dirindir')
// 声明函数
let wait = ms => new Promise((s)=>setTimeout(s, ms))
let cl = u => console.log(u)
let tt = jshi.si()
// 上传图片到imglarger
let org_list = []
let larger_list = []
let path_one = 'js\\源'
let path_two = 'js\\修复'
let upload2imglarger = async () => {
    // 启动
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox','--window-size=1200,800'],
        defaultViewport:null,
        headless: false,
        devtools: true,
        slowMo: 10,
    })
    // browser.on('disconnected',async () => {
    //     let {getImg} = await import('./getImg.mjs')
    //     larger_list.forEach(x => {
    //         let pt
    //         org_list.map(xx => {
    //             if(xx.toString().includes(x.name)){
    //                 pt = xx.replace(path_one,path_two)
    //             }
    //         })
    //         cl({
    //             href:x.href,
    //             path:pt,
    //             name:x.name
    //         })
    //         getImg.fetch(x.href,pt)
    //     })
    // })
    loadsmt(browser)
}
// 加载一些东西
let loadsmt = async (browser) => {
    let list = await dind(path_one)
    let xiu = await dind(path_two)
    addArrMethod()
    xiu.f.map(x=>{  // 过滤目的目录下的文件
        let name = x.split('\\')
        list.f.match_delAll(name[name.length-2]+'\\'+path.basename(x).split('.')[0])
    })
    console.log(list.f) //过滤后的文件列表
    // 在目的目录下生成文件目录
    for (let i of list.f) {
        await mkdir(path.dirname(i).replace(path_one,path_two))
    }
    // 发送图片到imglarger
    imglarger(browser,list.f.slice(0,3))
    org_list = list.f.slice(0,3)
}
let imglarger = async (browser,list) => {
    let page = await browser.newPage()
    await page.setDefaultNavigationTimeout(100000)
    await page.goto('https://imglarger.com',{waitUntil:'domcontentloaded'})
    page.on('dialog',async msg => {
        if(msg.message().includes('4000×4000')){
            await msg.dismiss()
            await page.waitForSelector('#file')
            let img = await page.$('#file')
            img.uploadFile(...list)
            await page.waitForSelector('.select')
            await page.$$eval('.select',(n)=>{
                n.map(x=>{
                    x.value = 4
                })
            })
        }
    })
    page.on('console',async msg => {
        try {   //捕获异常
            let data = msg.args()[0]._remoteObject.preview.properties
            larger_list.push({
                name: data[0].value,
                href: data[1].value
            })
            // 下载图片
            let {getImg} = await import('../../../getImg.mjs')
            let pt
            org_list.map(xx => {
                if(xx.toString().includes(data[0].value)){
                    pt = xx.replace(path_one,path_two)
                }
            })
            cl({
                href:data[1].value,
                path:pt,
                name:data[0].value
            })
            await getImg.fetch(data[1].value,pt)

            console.log('用时：'+jshi.t())
            if(org_list.length == larger_list.length){
                await browser.close()
                clearInterval(tt)
            }
        }catch(e){
            // console.log(e.message)
        }
    })
    await page.evaluate(async()=>{
        // 解禁限制
        let page_x = () => {
            if(document.querySelector('#restriction').innerText.includes('4000×4000')){
                clearInterval(page_xx)
                alert(document.querySelector('#restriction').innerText)
            }
        }
        let page_xx = setInterval(page_x,100)
        let wait = ms => new Promise((s)=>setTimeout(s, ms))
        let canbeuse = () => {
            let img = document.querySelector('body')
            img.classList.remove('tingle-enabled')
            img.removeChild(document.querySelector('.site-wrapper').previousElementSibling)
            let btn = Array.from(document.querySelectorAll('button'))
            btn.forEach(x=>x.removeAttribute('disabled'))
            let opt = Array.from(document.querySelectorAll('option'))
            opt.forEach(x=>x.removeAttribute('disabled'))
        }
        canbeuse()
        await wait(3000)
        canbeuse()

        // 高速率
        let ipt = Array.from(document.querySelectorAll('input[type="radio"]'))
        ipt.forEach(x=>x.value = 'high')
        
        // 每三秒点击一次按钮
        let btn = Array.from(document.querySelectorAll('.btn-Start-Button'))
        let btn_p = 0
        let btn_X = () => {
            btn[btn_p++].click()
            if(btn_p==btn.length) clearInterval(btn_xx)
        }
        let btn_xx = setInterval(btn_X,8000)

        // result：得到放大的图片地址
        let result_p = 0
        let temp_list = []
        let result_x = () => {
            let result = Array.from(document.querySelectorAll('tr'))
            result.forEach(x=>{
                let h = x.querySelector('.preview-image')
                if(h!==null){
                    if(h.href.includes('get.imglarger') && temp_list.includes(x) == false){
                        let see = {
                            name : x.querySelector('.name').innerText,
                            href : h.href
                        }
                        console.log(see)
                        ++result_p
                        temp_list.push(x)
                        if(result_p==result.length) clearInterval(result_xx)
                    }
                }
            })
        }
        let result_xx = setInterval(result_x,100)
    })
}
upload2imglarger()