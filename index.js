'use strict'
let bech32 = require('./bech32')

function encode (prefix, version, program) {
  if (version > 16) throw new Error('Invalid version (' + version + ')')
  if (version === 0) {
    if (program.length !== 20 && program.length !== 32) throw new Error('Unknown program')
  } else {
    if (program.length < 2) throw new Error('Program too short')
    if (program.length > 40) throw new Error('Program too long')
  }

  let words = bech32.toWords(program)
  words.unshift(version)

  return bech32.encode(prefix, words)
}

function decode (string, expectedPrefix) {
  let result = bech32.decode(string)
  let prefix = result.prefix
  let words = result.words
  if (expectedPrefix !== undefined) {
    if (prefix !== expectedPrefix) throw new Error('Expected ' + expectedPrefix + ', got ' + prefix)
  }

  let version = words[0]
  if (version > 16) throw new Error('Invalid version (' + version + ')')
  let program = bech32.fromWords(words.slice(1))

  if (version === 0) {
    if (program.length !== 20 && program.length !== 32) throw new Error('Unknown program')
  } else {
    if (program.length < 2) throw new Error('Program too short')
    if (program.length > 40) throw new Error('Program too long')
  }

  return { version, program: Buffer.from(program) }
}

module.exports = { encode, decode }
