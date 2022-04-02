const puppeteer = require('puppeteer')
const cl = u => console.log(u);

(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox','--window-size=1300,800'],
        headless: false,
        slowMo: 10,
        defaultViewport:null
    })
    let page1 =(await browser.pages())[0]
    cl(page1.url())
    await page1.goto('https://baidu.com')
    cl(page1.url())
    await page1.waitForTimeout(1000)
    let page2 = await browser.newPage()
    await page2.goto('chrome://history/')
    await page1.waitForTimeout(1000)
    await page1.bringToFront()
    await page1.waitForTimeout(1000)
    await page2.bringToFront()
    await page1.close()
})()