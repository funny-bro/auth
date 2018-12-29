const {getDigitVerify} = require('./request')
const path = require("path");
const Jimp = require('jimp');
const sleep = (n) => new Promise((res)=> setTimeout(res, n*1000))


const verifyImage = async () => {
  const lenna = await Jimp.read(`${__dirname}/../output/loginPage.png`)

  await lenna.crop(885,673,96,30).write(`${__dirname}/../output/loginPageCrop.png`); 
  await sleep(2) //wait a bit
  
  const verifyResult = await getDigitVerify(`${__dirname}/../output/loginPageCrop.png`)
  return verifyResult
}
module.exports = {verifyImage}