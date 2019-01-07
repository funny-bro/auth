const fs = require('fs')
const argv = require('optimist').argv;

const str = fs.readFileSync(`${__dirname}/../output/${process.env.LOGIN_USERNAME}cookie.log`, 'utf8')

const cookie = str.split('JSESSIONID=')[1].split('; Path=/; Secure; HttpOnly')[0]

fs.writeFileSync(argv.out, cookie, 'utf8')