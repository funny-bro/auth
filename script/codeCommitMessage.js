(async function() {
  const Codecommit = require('./lib/codecommit')
  
  const msg = process.argv[2] || null

  if(!msg) return console.error('given msg is empty')

  await Codecommit.post(msg)
})()