const fs = require('fs')
const {verifyImage} = require('../lib/verifyImage')

const blackListExtension = ['.jpeg', '.jpg', '.gif', '.js', '.css', '.png'];

let logString = ''

class CodeceptHelper extends Helper {
  // before/after hooks
  _before() {
    // remove if not used
  }

  _after() {
    // remove if not used
    fs.writeFileSync(`${new Date().getTime()}.log`, logString)
  }

  async verifyImage(timeStamp) {
    if(this.helpers.WebDriverIO)
      return verifyImage(`${timeStamp}-loginPage.png`, `${timeStamp}-loginPageCrop.png`, 885,673,96,30)

    if(this.helpers.Nightmare)
      return verifyImage(`${timeStamp}-loginPage.png`, `${timeStamp}-loginPageCrop.png`, 1235,1351,120,45)
  }

  submitForm(){
    return this.helpers.WebDriverIO.executeScript(function(){
      document.querySelector('#submit_hn a').click()
    })
  }
}

module.exports = CodeceptHelper;
