'use strict'
let tape = require('tape')
let fixtures = require('./fixtures')
let bech32 = require('../')

fixtures.addresses.valid.forEach((f, i) => {
  // unlike the reference impl., we don't support mixed/uppercase
  let string = f.string.toLowerCase()
  let buffer = Buffer.from(f.hex, 'hex')

  tape('encode ' + string, (t) => {
    t.plan(1)
    t.same(bech32.encode(f.prefix, f.version, buffer), string)
  })

  tape('decode ' + string, (t) => {
    t.plan(1)

    t.same(bech32.decode(string, f.prefix), {
      version: f.version,
      program: buffer
    })
  })
})

fixtures.addresses.invalid.forEach((f, i) => {
  if (f.ignore) return
  if (f.prefix && f.version !== undefined && f.program !== undefined) {
    tape(`encode fails (${f.exception})`, (t) => {
      t.plan(1)
      t.throws(function () {
        bech32.encode(f.prefix, f.version, Buffer.from(f.program, 'hex'))
      }, new RegExp(f.exception))
    })
  }

  if (f.string !== undefined) {
    tape(`decode fails for ${f.string} (${f.exception})`, (t) => {
      t.plan(1)
      t.throws(function () {
        bech32.decode(f.string, f.prefix)
      }, new RegExp(f.exception))
    })
  }
})
