let tape = require('tape')
let fixtures = require('./fixtures')
let bech32 = require('../')

fixtures.valid.forEach((f) => {
  // unlike the reference impl., we don't support mixed/uppercase
  let string = f.string.toLowerCase()
  let buffer = Buffer.from(f.hex, 'hex')

  tape('encode', (t) => {
    t.plan(1)
    t.same(bech32.encode(f.prefix, buffer), string)
  })

  tape('decode', (t) => {
    t.plan(1)

    let decode = bech32.decode(string)
    t.same({
      prefix: f.prefix,
      data: Buffer.from(f.hex, 'hex')
    }, decode)
  })
})

fixtures.validChecksum.forEach((f) => {
  tape('decode', (t) => {
    t.plan(1)

    // unlike the reference impl., we don't support mixed/uppercase
    let string = f.toLowerCase()
    t.ok(bech32.decode(string))
  })
})
