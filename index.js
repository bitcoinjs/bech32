'use strict'
let assert = require('assert')
let ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'
let GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3]

// pre-compute lookup table
let ALPHABET_MAP = {}
for (let z = 0; z < ALPHABET.length; z++) {
  let x = ALPHABET.charAt(z)
  assert(ALPHABET_MAP[x] === undefined)
  ALPHABET_MAP[x] = z
}

function polyModValues (values) {
  let chk = 1
  for (let p = 0; p < values.length; ++p) {
    let top = chk >> 25
    chk = (chk & 0x1ffffff) << 5 ^ values[p]
    for (let i = 0; i < 5; ++i) {
      if ((top >> i) & 1) {
        chk ^= GENERATOR[i]
      }
    }
  }
  return chk
}

function prefixExpand (prefix) {
  let e1 = []
  let e2 = []
  for (let i = 0; i < prefix.length; i++) {
    let c = prefix.charCodeAt(i)
    e1[i] = c >> 5
    e2[i] = c & 0x1f
  }

  return e1.concat([0]).concat(e2)
}

function createChecksum (prefix, bitData) {
  let values = prefixExpand(prefix).concat(bitData).concat([0, 0, 0, 0, 0, 0])
  let mod = polyModValues(values) ^ 1
  let ret = []
  for (let p = 0; p < 6; ++p) {
    ret.push((mod >> 5 * (5 - p)) & 31)
  }
  return ret
}

function verifyChecksum (prefix, bitData) {
  let values = prefixExpand(prefix).concat(bitData)
  let chk = polyModValues(values)
  return chk === 1
}

function encode (prefix, bitData) {
  // too long?
  assert((prefix.length + 7 + bitData.length) <= 90)
  let checksum = createChecksum(prefix, bitData)
  let result = ''
  for (let i = 0; i < bitData.length; ++i) {
    result += ALPHABET.charAt(bitData[i])
  }

  for (let i = 0; i < 6; i++) {
    result += ALPHABET.charAt(checksum[i])
  }

  return prefix + '1' + result
}

function decode (bechString) {
  let chars = []
  let p
  let hasLower = false
  let hasUpper = false
  for (p = 0; p < bechString.length; ++p) {
    let c = bechString.charCodeAt(p)
    assert(c >= 33 && c <= 126)
    if (c >= 97 && c <= 122) {
      hasLower = true
    }
    if (c >= 65 && c <= 90) {
      hasUpper = true
    }
    chars[p] = c
  }
  assert(!(hasLower && hasUpper))
  bechString = bechString.toLowerCase()
  let pos = bechString.lastIndexOf('1')
  assert(!(pos < 1 || pos + 7 > bechString.length || bechString.length > 90))

  let hrp = bechString.substring(0, pos)
  let data = []
  for (p = pos + 1; p < bechString.length; p++) {
    let d = ALPHABET.indexOf(bechString.charAt(p))
    assert(d !== -1)
    data.push(d)
  }

  assert(verifyChecksum(hrp, data))
  return {prefix: hrp, bitData: data.slice(0, data.length - 6)}
}

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

module.exports = { decode, encode, convertBits }
