const fs = require('fs')
const argv = require('optimist').argv;

const str = fs.readFileSync(`${__dirname}/../output/mapPage.html`, 'utf8')

const ENSID = str.split("init_data.ENSID='")[1].split("';")[0]
const ENUID = str.split("init_data.ENUID='")[1].split("';")[0]

fs.writeFileSync(argv.ensid, ENSID, 'utf8')
fs.writeFileSync(argv.enuid, ENUID, 'utf8')