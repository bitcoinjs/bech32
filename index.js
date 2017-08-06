'use strict'
let assert = require('assert')
let bech32 = require('./bech32')

function convertBits (data, inbits, outbits, pad) {
  let val = 0
  let bits = 0
  let maxv = (1 << outbits) - 1
  let ret = []

  for (let i = 0; i < data.length; ++i) {
    val = (val << inbits) | data[i]
    bits += inbits

    while (bits >= outbits) {
      bits -= outbits
      ret.push((val >> bits) & maxv)
    }
  }

  if (pad) {
    if (bits > 0) {
      ret.push((val << (outbits - bits)) & maxv)
    }
  } else {
    assert(bits < inbits)
    assert(!((val << (outbits - bits)) & maxv))
  }

  return ret
}

function encode (prefix, version, program) {
  // witness version 0 length checks
  if (version === 0) {
    assert((program.length === 20) || (program.length === 32))
  }

  let bitData = convertBits(program, 8, 5, true)
  bitData.unshift(version)

  return bech32.encode(prefix, bitData)
}

function decode (expectedPrefix, string) {
  let result = bech32.decode(string)
  assert.equal(result.prefix, expectedPrefix)

  assert((result.bitData.length > 0) && (result.bitData.length < 66))
  let version = result.bitData[0]
  let program = convertBits(result.bitData.slice(1), 5, 8, false)
  assert((program.length > 1) && (program.length < 41))

  // witness version 0 length checks
  if (version === 0) {
    assert((program.length === 20) || (program.length === 32))
  }

  return { version, program: Buffer.from(program) }
}

module.exports = { encode, decode, convertBits }
