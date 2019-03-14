(async function(){
  const keys = require('../keys.json')
  const authDao = require('../db/auth/dao')
  const shell = require('./childHelper')

  const withinNHour = (targetDate, n = 10) => {
    const ONE_HOUR = 60 * 60 * 1000; /* ms */
    return ((new Date) - targetDate) < n * ONE_HOUR
  }

  const unavailableCondition = (item) => {
    const {status, updatedAt} = item

    if(status !== 'available') return true

    if(!withinNHour(updatedAt, 10)) return true

    return false
  }

  const {count, data} = await authDao.findAndCountAll()
  console.log('[INFO] auth obj total    :', count)

  const unavailableList = data.filter(unavailableCondition)
  console.log('[INFO] unavailable total :', unavailableList.length)

  for(let i =0 ; i<unavailableList.length; i++) {
    const item = unavailableList[i]
    const {username} = item
    const pw = keys[username]
    
    try {
      await shell.execPromise(`USERNAME=${username} PASSWORD=${pw} source ./main/bin.sh`)
    }
    catch(err){
      console.log('[ERROR] ', err)
    }
  }
  
  process.exit()
})()