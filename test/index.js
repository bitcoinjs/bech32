let tape = require('tape')
let fixtures = require('./fixtures')
let bech32 = require('../')

fixtures.valid.forEach((f, i) => {
  // unlike the reference impl., we don't support mixed/uppercase
  let string = f.string.toLowerCase()
  let buffer = Buffer.from(f.hex, 'hex')

//   tape('encode ' + string, (t) => {
//     t.plan(1)
//     t.same(bech32.encode(f.prefix, buffer), string)
//   })

  tape('decode ' + string, (t) => {
    t.plan(1)

    let actual = bech32.decode(string)
    t.same(actual, {
      prefix: f.prefix,
      data: buffer
    })
  })
})
