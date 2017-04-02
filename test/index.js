let tape = require('tape')
let fixtures = require('./fixtures')
let bech32 = require('../')

fixtures.validChecksum.forEach((f) => {
  let string = f.toLowerCase()
  tape(string + ' has a valid checksum', (t) => {
    t.plan(1)
    t.ok(bech32.decode(string))
  })
})

fixtures.valid.forEach((f, i) => {
  // unlike the reference impl., we don't support mixed/uppercase
  let string = f.string.toLowerCase()
  let buffer = Buffer.from(f.hex, 'hex')

  tape('encode ' + string, (t) => {
    t.plan(1)
    t.same(bech32.encode(f.prefix, buffer), string)
  })

  if (i !== 4) return
  tape('decode ' + string, (t) => {
    t.plan(1)

    let decode = bech32.decode(string)
    t.same({
      prefix: f.prefix,
      data: buffer
    }, decode)
  })
})
