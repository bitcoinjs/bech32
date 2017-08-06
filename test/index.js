'use strict'
let tape = require('tape')
let fixtures = require('./fixtures')
let bech32 = require('../')

fixtures.bech32.valid.forEach((f, i) => {
  let good = f.string
  let pos = good.lastIndexOf('1')
  let bad = good.slice(0, pos + 1) +
    String.fromCharCode(good.charCodeAt(pos + 1) ^ 1) +
    good.slice(pos + 2)

  tape('succeeds with a valid checksum: ' + good, (t) => {
    t.plan(1)
    t.doesNotThrow(function () {
      bech32.decode(good)
    })
  })

  tape('fails with incorrect checksum: ' + bad, (t) => {
    t.plan(1)
    t.throws(function () {
      bech32.decode(bad)
    })
  })
})

fixtures.addresses.valid.forEach((f, i) => {
  // unlike the reference impl., we don't support mixed/uppercase
  let string = f.string
  let buffer = Buffer.from(f.hex, 'hex')
  let data = [f.version].concat(bech32.convertBits(buffer, 8, 5, true))

  tape('encode ' + string, (t) => {
    t.plan(1)
    let encoded = bech32.encode(f.prefix, data)
    t.same(encoded, string.toLowerCase())
  })

  tape('decode ' + string + ' as valid base58', (t) => {
    t.plan(4)

    let result = bech32.decode(string)
    t.same(result, {
      prefix: f.prefix,
      bitData: data
    })

    let addr = bech32.encode(f.prefix, data)
    t.same(addr, string.toLowerCase())

    let version = result.bitData[0]
    let program = bech32.convertBits(result.bitData.slice(1), 5, 8, false)

    t.same(version, f.version)
    t.same(Buffer.from(program).toString('hex'), f.hex)
  })
})
