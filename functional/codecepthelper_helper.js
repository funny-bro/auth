
const {verifyImage} = require('../lib/verifyImage')

class CodeceptHelper extends Helper {
  // before/after hooks
  _before() {
    // remove if not used
  }

  _after() {
    // remove if not used
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

  clickButton(selector) {
    console.log(' -=-=-=-=-=-= clickButton -=-=-=-=-=')
    console.log(' click : ', selector)
    return this.helpers.WebDriverIO.executeScript(function(selector){
      console.log( document.querySelector(selector))
      return document.querySelector(selector).click()
    }, selector)
  }

  verifyImage() {
    return verifyImage()
  }

  submitForm(){
    return this.helpers.WebDriverIO.executeScript(function(){
      document.querySelector('#submit_hn a').click()
    })

  }
}

module.exports = CodeceptHelper;
