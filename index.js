var  os = require('os'),
    crypto = require('crypto'),
    uuidv4 = require('uuid/v4'),
    isuuid = require('isuuid'),
    uuidv5 = require('uuid/v5');

function macs(n) {
    var x = {};
    return Object.keys(n).filter(function(v) {
        return !n[v].forEach(function(v) {
            v.mac !== "00:00:00:00:00:00" && (x[v.mac] = 1);
        })
    }), Object.keys(x);
}

function toArray(buf) {
    var ab = [];
    for (var i = 0; i < buf.length && i < 16; ++i) {
        var code = buf.charCodeAt(i);
        ab = ab.concat([code]);
    }
    for (var i = buf.length; i < 16; ++i) {
        ab = ab.concat([0]);
    }
    return ab;
}

module.exports = function (namespace) {
    var ns = namespace || uuidv4();
    
    if (!isuuid(ns)) {
        if (typeof ns != 'string') {
            throw TypeError('namespace must be uuid or a string')
        }
        ns = toArray(ns);
    }
    
    function generate() {
      var id = os.cpus().map(function(cpu) {
          return cpu.model;
      }).join(':') + '|' + os.totalmem() + '|' + macs(os.networkInterfaces()).join('|');
      return crypto.createHash('sha1').update(id).digest('hex');
    }
    return uuidv5(generate(), ns);
};

module.exports.macs = macs;
