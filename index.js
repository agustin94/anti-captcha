const puppeteer = require('puppeteer');

//HHHH
//const CRED_PATH = require ('./credentials.json');

(async () => {
  const pathToExtension = require('path').join(__dirname, 'my-extension');
  const browser = await puppeteer.launch({ headless: true,args: ['--start-maximized',`--load-extension=${'C:\Users\Agustin Moreno\Documents\anticaptcha-plugin_v0.3211'}`],
   })
  const page = await browser.newPage()
  

  await page.goto('https://seti.afip.gob.ar/padron-puc-constancia-internet/ConsultaConstanciaAction.do')
  await page.setViewport({ width : 1366, height : 657 })

  const targets = await browser.targets();
  const backgroundPageTarget = targets.find(target => target.type() === 'background_page');
  const backgroundPage = await backgroundPageTarget.page();

  const elementHandle = await page.$('iframe[id="miBody"]');
  const frame = await elementHandle.contentFrame();
  await frame.waitForSelector('#captchaField')
  await frame.click('#captchaField',{ button: 'middle' })

  await page.screenshot({path: 'buddy-screenshot.png',fullPage: true});
    
  //await frame.type('#cuit',"20-38403239-8")
  browser.close();
 })();
