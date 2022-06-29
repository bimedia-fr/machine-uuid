var machine = require('..'),
    assert = require('assert'),
    uuidv4 = require('uuid/v4');

describe('machine-uuid', () => {
    describe('WithNamespace', () => {
        it('should return a consistent uuid inside namespace', () => {
            var namespace = uuidv4();
            var uuid = machine(namespace);
            assert.ok(uuid);
            var uuid2 = machine(namespace);
            assert.ok(uuid2);
            assert.equal(uuid, uuid2, 'uuid is consistent inside manespace');
        });
    });

    describe('WithStringNamespace', () => {
        it('should return a consistent uuid inside namespace', () => {
            var namespace = 'garbagenamespace';
            var uuid = machine(namespace);
            assert.ok(uuid);
            var uuid2 = machine(namespace);
            assert.ok(uuid2);
            assert.equal(uuid, uuid2, 'uuid is consistent inside manespace');
        });
    });

    describe('WithLongStringNamespace', () => {
        it('should return a consistent uuid inside namespace', () => {
            var namespace = 'mygarbagenamespaceisverylong';
            var uuid = machine(namespace);
            assert.ok(uuid);
            var uuid2 = machine(namespace);
            assert.ok(uuid2);
            assert.equal(uuid, uuid2, 'uuid is consistent inside manespace');
        });
    });
    
    describe('WithShortStringNamespace', () => {
        it('should return a consistent uuid inside namespace', () => {
            var namespace = 'mynamespac1';
            var uuid = machine(namespace);
            assert.ok(uuid);
            var uuid2 = machine(namespace);
            assert.ok(uuid2);
            assert.equal(uuid, uuid2, 'uuid is consistent inside manespace');
        });
    });

    describe('WithIntegerNamespace', () => {
        it('should throw an error', () => {
            var namespace = 123456;
            try {
                var uuid = machine(namespace);
                assert.fail('typeerror expected');
            }catch (e) {
                assert.ok( e, 'type error expected');
            }
        });
    });

    describe('WithoutNamespace', () => {
        it('should return different uuid', () => {
            var uuid = machine();
            assert.ok(uuid);
            var uuid2 = machine();
            assert.ok(uuid2);
            assert.notEqual(uuid, uuid2, 'uuid is not consistent through different manespaces');
        });
    });

    describe('With custom invariant function', () => {
        it('should return consistent uuid', () => {
            var namespace = machine();
            function invariant() {
                return 'myinvariant';
            }
            var uuid1 = machine(namespace, invariant);
            var uuid2 = machine(namespace, invariant);
            assert.ok(uuid2);
            assert.equal(uuid1, uuid2, 'uuid is not consistent through manespaces');
        });
    });
});
