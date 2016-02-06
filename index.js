var  os = require('os'),
    crypto = require('crypto');

function macs() {
    var n = os.networkInterfaces(), x = {};
    return Object.keys(n).filter(function(v) {
        return !n[v].forEach(function(v) {
            v.mac.substr(0, v.mac.indexOf(":")) !== "00" && (x[v.mac] = 1);
        })
    }), Object.keys(x);
}

function generate() {
  var id = os.cpus().map(function(cpu) {
      return cpu.model;
  }).join(':') + '|' + os.totalmem() + '|' + macs().join('|');
  return crypto.createHash('md5').update(id).digest('hex');
}

var id = generate();
var uuid = id.substring(0, 8) + '-' + id.substring(8, 12) + '-' + id.substring(12, 16) + '-' + id.substring(16, 20) + '-' + id.substring(20);

module.exports = {
    id : id,
    uuid : uuid
};
