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
    }
}