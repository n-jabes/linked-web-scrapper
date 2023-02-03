// import webdriver from 'selenium-webdriver'
// const  By = webdriver.By;
// const driver = new webdriver.Builder()
//   .forBrowser('Brave')
//   .build();

// driver.get("https://www.smartproxy.com/");

// driver.findElements(By.xpath('//figure[@class="box"]/div[@class="name"]').then(function(elements){
//   for (var i = 0; i < elements.length; i++){
//       elements[i].getText().then(function(text){
//         console.log(text)
//       });
//     };
// }))

const puppeteer = require('puppeteer');

(async() => {
    const delay = time => {
        return new Promise((resolve, reject) => setTimeout(() => resolve(), time));
    }
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--autoplay-policy=no-user-gesture-required', '--window-size=1920,1080'],
        defaultViewport: null,
    });
    const page = await browser.newPage();

    await page.goto('https://linkedin.com', { waitUntil: 'domcontentloaded' });
    // let input = await page.$('input[name="q"');
    
    // await input.type('Happierleads');
    // await input.press('Enter');
    // await delay(10000);
    await page.$eval('input[name="q"', el => el.value = '');
    // await page.evaluate(() => document.getElementsByTagName('input')[0].value = '');
    input = await page.$('input[name="q"');
    
    await input.type('github');
    await input.press('Enter');
    await delay(5000);
    const h3 = await page.$('h3');
    await h3.click();
    // const hvalue = await (await h3.getProperty('textContent')).jsonValue();
    // console.log('got value: ', hvalue);
    await delay(8000);
    let link = await page.$('.HeaderMenu-link--sign-in');
    await link.click();
    await delay(8000);
    const emailField = await page.$('#login_field');
    const passField = await page.$('#password')
    const loginBtn = await page.$('input[name="commit"');
    
    await emailField.type('test@gmail.com');
    await passField.type('89348ufnjdksafas');
    await loginBtn.click();
    
    delay(7000);
    await browser.close();
})();