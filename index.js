const puppeteer = require('puppeteer');
//const CRED_PATH = require ('./credentials.json');

(async () => {
  const browser = await puppeteer.launch({ headless: false,args: ['--start-maximized'] })
  const page = await browser.newPage()

  await page.goto('https://seti.afip.gob.ar/padron-puc-constancia-internet/ConsultaConstanciaAction.do',{waitUntil: 'networkidle0'})
  await page.setViewport({ width : 1366, height : 657 })

  const elementHandle = await page.$('iframe[id="miBody"]');
  const frame = await elementHandle.contentFrame();
  await frame.waitForSelector('#cuit')
  await frame.type('#cuit',"20-38403239-8")

 })();