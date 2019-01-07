const fs = require('fs')
const {verifyImage} = require('../lib/verifyImage')

const blackListExtension = ['.jpeg', '.jpg', '.gif', '.js', '.css', '.png'];

let logString = ''
let targetCookie = ''

const argv = require('optimist').argv;
const cookie = argv['_'] && argv['_'][2] && argv['_'][2].split('cookie=')[1] || null

class CodeceptHelper extends Helper {
  // before/after hooks

  _before() {
    if(cookie) {
      return this.helpers['Nightmare'].setCookie({
        name: 'JSESSIONID', 
        value: cookie,
        url: 'https://pqt.ttt.nat.gov.tw/Home'
      });
    }
  }

  _after() {
    // remove if not used
  }

  saveLog(timeStamp) {
    fs.writeFileSync(`output/${timeStamp}.log`, logString)
    fs.writeFileSync(`output/${timeStamp}cookie.log`, targetCookie)
  }

  disableIFrameAlert() {
    console.log('1 -=-=-=-=-= disableIFrameAlert')
    if(this.helpers.Nightmare) {
      console.log('1.1 -=-=-=-=-= disableIFrameAlert')

      this.helpers['Nightmare'].browser.evaluate(() => {
        console.log("[INFO] disable parent's alert")
        window.alert = null
        console.log('document.getElementById("IFRAME1"): ', document.getElementById("IFRAME1"))

        console.log("[INFO] disable iframe's alert")
        document.getElementById("IFRAME1").contentWindow.alert = null
        console.log('document.getElementById("IFRAME1").contentWindow.alert: ', document.getElementById("IFRAME1").contentWindow.alert)
        return 
        // return window.alert = null
      })
    }
  }

  monitor(){
    if(this.helpers.Nightmare) {
      this.helpers['Nightmare'].browser.on('did-get-response-details', function (event, socketStatus, url, originalUrl, code, method, referrer, headers, type, something) {
        if(blackListExtension.find((item)=>originalUrl.includes(item))) return
        logString += `\n${method}  :     ${originalUrl}\n`
        logString += `\n  referrer :     ${referrer}\n`

        // console.log(method, ': ', originalUrl)
        Object.keys(headers).forEach((key)=> {
          logString += `\n     ${key} :  ${headers[key].join(',')}`
        })
      })

      this.helpers['Nightmare'].browser.on('did-get-redirect-request', function(e,originalUrl,navigateTo,i,httpCode,method,referrer,headers) {
        logString += `\nRedirect Request\n`
        logString += `\n${method}  :     ${originalUrl}\n`
        logString += `\n  referrer :     ${referrer}\n`

        // console.log(method, ': ', originalUrl)
        Object.keys(headers).forEach((key)=> {
          logString += `\n     ${key} :  ${headers[key].join(',')}`

          if(key === 'set-cookie') {
            targetCookie = headers[key]
          }
        })
      })

      this.helpers['Nightmare'].browser.on('page', function(type="alert", message){
        console.log(' -=-=-=-=-= message', message)
        return
      })

    }
  }

  seeElement(locator) {
    if(this.helpers.Nightmare)
      this.helpers['Nightmare'].browser.visible(locator);
  }
  
  selectOptionByOrder(selector, order) {
    console.log(' -=-=-=-=-=-= selectOptionByOrder -=-=-=-=-=')
    console.log(' click order : ', selector, order)
    return this.helpers.WebDriverIO.executeScript(function(selector, order){
      return document.querySelector(selector).selectedIndex = order
    }, selector, order)
  }

  async verifyImage(timeStamp) {
    if(this.helpers.WebDriverIO)
      return verifyImage(`${timeStamp}-loginPage.png`, `${timeStamp}-loginPageCrop.png`, 885,673,96,30)

    if(this.helpers.Nightmare)
      return verifyImage(`${timeStamp}-loginPage.png`, `${timeStamp}-loginPageCrop.png`, 1788,1351,120,45)
      // return verifyImage(`${timeStamp}-loginPage.png`, `${timeStamp}-loginPageCrop.png`, 1235,1351,120,45)
  }

  async saveHtml() {
    const html = await this.helpers.Nightmare.executeScript(function(){
      console.log('document.querySelectorAll("html")[0].outerHTML: ', document.querySelectorAll("html")[0].outerHTML)
      return document.querySelectorAll("html")[0].outerHTML
    })
    
    return fs.writeFileSync('./output/mapPage.html', html, 'utf8')

  }
}

module.exports = CodeceptHelper;
