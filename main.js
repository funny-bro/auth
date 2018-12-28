(async function(){
  const {getDigitVerify} = require('./lib/request')

  const result  = await getDigitVerify(`${__dirname}/mock/b235r.jpg`)

  console.log(result)
})()