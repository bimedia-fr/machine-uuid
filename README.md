# machine-uuid
simple node module to generate a machine uuid based on hardware available. (require node v4+)

## installation

```sh
npm install bimedia-machine-uuid
```

## usage

```js
var machine = require('machine-uuid')

console.log(machine());

```

To keep id consistent between multiple calls or executions you must pass a `namespace` argument.

```js
var machine = require('machine-uuid')

console.log(machine('mynamespace'));
// 2c433a07-140a-5bb9-949a-4997b566c397
console.log(machine('mynamespace'));
// 2c433a07-140a-5bb9-949a-4997b566c397
```

Namespace may be a string (16 chars) or a uuid (v4):
```js
var machine = require('machine-uuid'),
    uuidv4 = require('uuid/v4');

var namespace = uuidv4();

console.log(machine(namespace));
// 2c433a07-140a-5bb9-949a-4997b566c397
console.log(machine(namespace));
// 2c433a07-140a-5bb9-949a-4997b566c397
```
