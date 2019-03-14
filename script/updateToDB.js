(async function () {
  const authDao = require('../db/auth/dao')
  const argv = require('optimist').argv;


  const username = argv.USERNAME
  const cookieValue = argv.cookieValue
  const enuid = argv.ENUID
  const ensid = argv.ENSID
  const status = 'available'

  const payload = {
    cookieValue: `${cookieValue}`,
    enuid: `${enuid}`,
    ensid: `${ensid}`,
    status: `${status}`
  }

  const condition = { username }

  console.log('payload', payload)
  console.log('condition', condition)

  try {
    await authDao.update(payload, condition)

    console.log('[INFO] data update finish')
    process.exit()
  } catch (err) {
    console.log('err:', err)
    process.exit(1)
  }
})()