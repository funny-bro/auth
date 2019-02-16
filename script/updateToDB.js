(async function(){
    const authDao = require('../db/auth/dao')
    const argv = require('optimist').argv;
    

    let username = argv.LOGIN_USERNAME
    let cookieValue = argv.cookieValue
    let enuid = argv.ENUID
    let ensid = argv.ENSID

    const payload = {cookieValue : `${cookieValue}`,
                      enuid : `${enuid}`,
                      ensid : `${ensid}`}

    const condition = {username}
    try {
        await authDao.update(payload, condition)

        console.log('[INFO] data update finish')
      } catch(err){
        console.log('err:', err)
      }
})()