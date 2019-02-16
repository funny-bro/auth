(async function(){
    const authDao = require('../db/auth/dao')
    const argv = require('optimist').argv;
    

    let username = argv.LOGIN_USERNAME
    let cookieValue = argv.cookieValue
    let enuid = argv.ENUID
    let ensid = argv.ENSID
    let status = 'available'

    const payload = {cookieValue : `${cookieValue}`,
                      enuid : `${enuid}`,
                      ensid : `${ensid}`,
                      status : `${status}`}

    const condition = {username}

    console.log('payload',payload)
    console.log('condition',condition)

    try {
        await authDao.update(payload, condition)

        console.log('[INFO] data update finish')
      } catch(err){
        console.log('err:', err)
      }
})()