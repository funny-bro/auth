module.exports = function getIP() {
  const os = require('os');
  const ifaces = os.networkInterfaces();

  let ip = ""
  Object.keys(ifaces).forEach(function (ifname) {
    if (ip) {
      return
    }
    let alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if (ip) {
        return
      }
      if ('IPv4' !== iface.family || iface.internal !== false) {
        return;
      }

      if (alias >= 1) {
        console.log(ifname + ':' + alias, iface.address);
      } else {
        console.log(ifname, iface.address);
        ip = iface.address
      }
      ++alias;
    });
  });

  console.log('Get ip success: ', ip)
  return ip
}
