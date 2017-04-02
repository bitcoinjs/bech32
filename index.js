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

function convertbits (data, inbits, outbits, pad) {
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
    assert(!((val << (outbits - bits)) & maxv))
    assert(bits < inbits)
  }

  return ret
}

function encode (prefix, data) {
  data = Buffer.from(convertbits(data, 8, 5, true))

  // too long?
  assert((prefix.length + 7 + data.length) <= 90)

  // determine chk mod
  let chk = 0 | 0
  for (let i = 0; i < prefix.length; ++i) {
    let c = prefix.charCodeAt(i)
    assert.notEqual(c >> 5, 0)

    chk = polymodStep(chk) ^ (c >> 5)
  }

  let result = ''
  for (let i = 0; i < prefix.length; ++i) {
    let c = prefix.charCodeAt(i)
    chk = polymodStep(chk) ^ (c & 0x1f)

    result += String.fromCharCode(c)
  }
  result += '1'

  for (let i = 0; i < data.length; ++i) {
    let x = data[i]
    assert.equal(x >> 5, 0)

    chk = polymodStep(chk) ^ x
    result += ALPHABET.charAt(x)
  }

  for (let i = 0; i < 6; ++i) {
    chk = polymodStep(chk)
  }
  chk ^= 1

  for (let i = 0; i < 6; ++i) {
    let v = chk >> ((5 - i) * 5) & 0x1f
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
  let data = str.slice(split + 1)
  assert(prefix.length >= 1)
  assert(data.length >= 6)

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

  let result = Buffer.allocUnsafe(data.length)

  for (let i = 0; i < data.length; ++i) {
    let cv = data.charCodeAt(i)
    assert.equal(cv & 0x80, 0)

    let c = data.charAt(i)
    let v = ALPHABET_MAP[c]
    assert.notEqual(v, undefined)

    chk = polymodStep(chk) ^ v

    // not in the checksum?
    if (i + 6 < data.length) {
      result.writeUInt8(v, i)
    }
  }

  assert.equal(chk & 0x1, 1)
  result = Buffer.from(convertbits(result, 5, 8, false))

  return { prefix, data: result }
}

module.exports = { decode, encode }
