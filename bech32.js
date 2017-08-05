'use strict'
let assert = require('assert')
let ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'

// pre-compute lookup table
let ALPHABET_MAP = {}
for (var z = 0; z < ALPHABET.length; z++) {
  var x = ALPHABET.charAt(z)

  if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
  ALPHABET_MAP[x] = z
}

function polymodStep (pre) {
  let b = pre >> 25
  return ((pre & 0x1FFFFFF) << 5) ^
    (-((b >> 0) & 1) & 0x3b6a57b2) ^
    (-((b >> 1) & 1) & 0x26508e6d) ^
    (-((b >> 2) & 1) & 0x1ea119fa) ^
    (-((b >> 3) & 1) & 0x3d4233dd) ^
    (-((b >> 4) & 1) & 0x2a1462b3)
}

function encode (prefix, bitData) {
  // too long?
  assert((prefix.length + 7 + bitData.length) <= 90)

  // determine chk mod
  let chk = 1
  for (let i = 0; i < prefix.length; ++i) {
    let c = prefix.charCodeAt(i) >> 5
    assert.notEqual(c, 0)

    chk = polymodStep(chk) ^ c
  }
  chk = polymodStep(chk)

  let result = ''
  for (let i = 0; i < prefix.length; ++i) {
    let c = prefix.charAt(i)
    let v = prefix.charCodeAt(i)
    chk = polymodStep(chk) ^ (v & 0x1f)

    result += c
  }
  result += '1'

  for (let i = 0; i < bitData.length; ++i) {
    let x = bitData[i]
    assert.equal(x >> 5, 0)

    chk = polymodStep(chk) ^ x
    result += ALPHABET.charAt(x)
  }

  for (let i = 0; i < 6; ++i) {
    chk = polymodStep(chk)
  }
  chk ^= 1

  for (let i = 0; i < 6; ++i) {
    let v = (chk >> ((5 - i) * 5)) & 0x1f
    result += ALPHABET.charAt(v)
  }

  return result
}

function decode (str) {
  assert(str.length >= 8)
  assert(str.length <= 90)

  // don't allow mixed case
  let lowered = str.toLowerCase()
  assert.equal(str, lowered)

  let split = str.lastIndexOf('1')
  let prefix = str.slice(0, split)
  let bitData = str.slice(split + 1)
  assert(prefix.length >= 1)
  assert(bitData.length >= 6)

  let chk = 1
  for (let i = 0; i < prefix.length; ++i) {
    let c = prefix.charCodeAt(i)
    assert(c >= 33 && c <= 126)

    chk = polymodStep(chk) ^ (c >> 5)
  }

  chk = polymodStep(chk)
  for (let i = 0; i < prefix.length; ++i) {
    let c = prefix.charCodeAt(i)
    chk = polymodStep(chk) ^ (c & 0x1f)
  }

  // NOTE: zero-fill required
  let result = Buffer.alloc(bitData.length - 6)

  for (let i = 0; i < bitData.length; ++i) {
    let cv = bitData.charCodeAt(i)
    assert.equal(cv & 0x80, 0)

    let c = bitData.charAt(i)
    let v = ALPHABET_MAP[c]
    assert.notEqual(v, undefined)

    chk = polymodStep(chk) ^ v

    // not in the checksum?
    if (i + 6 < bitData.length) {
      result.writeUInt8(v, i)
    }
  }

  assert.equal(chk & 0x1, 1)

  return { prefix, bitData: result }
}

module.exports = { decode, encode }
