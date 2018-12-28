const fetch = require('node-fetch')
const {fileToBase64} = require('./file')

const url = `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_KEY}`
const getBase64Body = (base64) => ({
  "requests": [
    {
      "features": [
        {
          "type": "DOCUMENT_TEXT_DETECTION"
        }
      ],
      "image": {
        "content": base64
      }
    }
  ]
})

const headers = {
  "Content-Type": "application/json"
}

const getDigitVerify = (filePath) => new Promise((resolve, reject)=> {
  const base64 = fileToBase64(filePath)
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(getBase64Body(base64)),
    headers
  })
  .then(res => res.json())
  .then(res => {
    return resolve(res.responses[0].textAnnotations[0].description)
  })
})

module.exports = {getDigitVerify}