var machine = require('..'),
    uuidv4 = require('uuid/v4');

module.exports = {
    testWithNamespace : function (test) {
        var namespace = uuidv4();
        var uuid = machine(namespace);
        test.ok(uuid);
        var uuid2 = machine(namespace);
        test.ok(uuid2);
        test.equal(uuid, uuid2, 'uuid is consistent inside manespace');
        test.done();
    },
    testWithStringNamespace : function (test) {
        var namespace = 'garbagenamespace';
        var uuid = machine(namespace);
        test.ok(uuid);
        var uuid2 = machine(namespace);
        test.ok(uuid2);
        test.equal(uuid, uuid2, 'uuid is consistent inside manespace');
        test.done();
    },
    testWithLongStringNamespace : function (test) {
        var namespace = 'mygarbagenamespaceisverylong';
        var uuid = machine(namespace);
        test.ok(uuid);
        var uuid2 = machine(namespace);
        test.ok(uuid2);
        test.equal(uuid, uuid2, 'uuid is consistent inside manespace');
        test.done();
    },
    testWithShortStringNamespace : function (test) {
        var namespace = 'mynamespac1';
        var uuid = machine(namespace);
        test.ok(uuid);
        var uuid2 = machine(namespace);
        test.ok(uuid2);
        test.equal(uuid, uuid2, 'uuid is consistent inside manespace');
        test.done();
    },
    testWithIntegerNamespace : function (test) {
        var namespace = 123456;
        try {
            var uuid = machine(namespace);
            test.fail('typeerror expected');
        }catch (e) {
            test.ok( e, 'type error expected');
        }
        test.done();
    },
    testWithoutNamespace : function (test) {
        var uuid = machine();
        test.ok(uuid);
        var uuid2 = machine();
        test.ok(uuid2);
        test.notEqual(uuid, uuid2, 'uuid is not consistent through different manespaces');
        test.done();
    },
    testMacCollision: function(test) {
        var sample1 = { 
           enp1s0: 
            [ { address: '10.1.17.173',
                netmask: '255.255.0.0',
                family: 'IPv4',
                mac: '00:71:C2:40:09:4F',
                internal: false,
                cidr: '10.1.17.173/16' },
              { address: 'af20::75a4:79f9:66c0:c3ab',
                netmask: 'ffff:ffff:ffff:ffff::',
                family: 'IPv6',
                mac: '00:71:C2:40:09:4F',
                scopeid: 2,
                internal: false,
                cidr: 'af20::75a4:79f9:66c0:c3ab/64' } ] };
        var sample2 = { 
            enp1s0: 
                [ { address: '10.1.17.173',
                    netmask: '255.255.0.0',
                    family: 'IPv4',
                    mac: '00:71:C2:3E:52:66',
                    internal: false,
                    cidr: '10.1.17.173/16' },
                { address: 'af20::75a4:79f9:66c0:c3ab',
                    netmask: 'ffff:ffff:ffff:ffff::',
                    family: 'IPv6',
                    mac: '00:71:C2:3E:52:66',
                    scopeid: 2,
                    internal: false,
                    cidr: 'af20::75a4:79f9:66c0:c3ab/64' } ] };

                test.ok(machine.macs(sample1) != machine.macs(sample2));

                test.done();
    }
}