const fileToBase64 = (path) => {
  const base64 = require('fs').readFileSync(path, 'base64')
  return base64
}

module.exports = {fileToBase64}