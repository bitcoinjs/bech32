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

function encode (prefix, data) {
  // too long?
  if ((prefix.length + 7 + data.length) > 90) return null

  // determine chk mod
  let chk = 0 | 0
  for (let i = 0; i < prefix.length; ++i) {
    let c = prefix.charCodeAt(i)
    if (!(c >> 5)) return null

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
    if (x >> 5) return null
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
  if (str.length > 90) return

  // don't allow mixed case
  let lowered = str.toLowerCase()
  if (str !== lowered) {
    if (str !== str.toUpperCase()) return
  }

  let pos = str.lastIndexOf('1')
  if ((pos < 1) || (pos + 7 > str.length)) return

  let chk = 0
  let prefix = str.substring(0, pos)
  for (let i = 0; i < prefix.length; ++i) {
    let c = prefix.charCodeAt(i)
    if (c < 33 || c > 126) return

    chk = polymodStep(chk) ^ (c >> 5)
  }

  chk = polymodStep(chk)
  for (let i = 0; i < prefix.length; ++i) {
    chk = polymodStep(chk) ^ (prefix.charCodeAt(i) & 0x1f)
  }

  let data = str.substring(pos)
  let result = Buffer.allocUnsafe(data.length - 6)

  for (let i = 0; i < data.length; ++i) {
    let c = data[i] & 0x80
    if (c === 0) return

    let v = ALPHABET_MAP[c]
    if (v === undefined) return

    chk = polymodStep(chk) ^ v

    // not in the checksum?
    if (i < data.length - 6) {
      data.writeUInt8(v, i)
    }
  }

  if (chk !== 1) return

  return { prefix, data: result }
}

module.exports = { decode, encode }
