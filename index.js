var  os = require('os'),
    crypto = require('crypto'),
    uuidv4 = require('uuid/v4'),
    isuuid = require('isuuid'),
    uuidv5 = require('uuid/v5');

// wmic drive serialnumber
// see https://github.com/mhzed/machine-uuid/blob/master/index.js

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

/**
 * default invariant func based on cpu, macs address and memory
 * @returns id
 */
function generate() {
  return os.cpus().map(function(cpu) {
      return cpu.model;
  }).join(':') + '|' + os.totalmem() + '|' + macs(os.networkInterfaces()).join('|');
}

/**
 * return sha1 hash data
 * @param {String} data 
 * @returns sha1 hash
 */
function hash(data) {
    return crypto.createHash('sha1').update(data).digest('hex');
}

module.exports = function (namespace, invariant) {
    var ns = namespace || uuidv4();
    var func = invariant || generate;
    
    if (!isuuid(ns)) {
        if (typeof ns != 'string') {
            throw TypeError('namespace must be uuid or a string')
        }
        ns = toArray(ns);
    }
    
    return uuidv5(hash(func()), ns);
};

module.exports.macs = macs;
