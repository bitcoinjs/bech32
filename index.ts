'use strict';
const BECH32_SEPARATOR = '1';
const BECH32_MAX_LIMIT = 90;
const BECH32_MIN_LIMIT = 8;
const ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

const ALPHABET_MAP: { [key: string]: number } = [...ALPHABET].reduce(
  (res, el, i) => ({ ...res, [el]: i }),
  {}
);

const GENERATORS = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];

function polymodStep(pre: number): number {
  const b = pre >> 25;
  let res = (pre & 0x1ffffff) << 5;
  for (let i = 0; i < GENERATORS.length; i++) res ^= -((b >> i) & 1) & GENERATORS[i];
  return res;
}

function prefixChk(prefix: string) {
  let chk = 1;
  for (let char of prefix) {
    let code = char.charCodeAt(0);
    if (code < 33 || code > 126) throw new Error('Invalid prefix');
    chk = polymodStep(chk) ^ (code >> 5);
  }
  chk = polymodStep(chk);
  for (let char of prefix) chk = polymodStep(chk) ^ (char.charCodeAt(0) & 0x1f);
  return chk;
}

export function encode(prefix: string, data: ArrayLike<number>, LIMIT: number = BECH32_MAX_LIMIT) {
  if (LIMIT !== null && prefix.length + 7 + data.length > LIMIT)
    throw new TypeError('Exceeds length limit');
  prefix = prefix.toLowerCase();
  let chk = prefixChk(prefix);

  let result = prefix + BECH32_SEPARATOR;

  for (let i = 0; i < data.length; i++) {
    const x = data[i];
    if (x >> 5 !== 0) throw new Error('Not 5-bit word');
    chk = polymodStep(chk) ^ x;
    result += ALPHABET[x];
  }
  for (let i = 0; i < 6; i++) chk = polymodStep(chk);
  chk ^= 1;
  for (let i = 0; i < 6; i++) result += ALPHABET[(chk >> ((5 - i) * 5)) & 0x1f];
  return result;
}

export function encodeUnsafe(
  prefix: string,
  data: ArrayLike<number>,
  LIMIT: number = BECH32_MAX_LIMIT
) {
  try {
    return encode(prefix, data, LIMIT);
  } catch (error) {
    return;
  }
}

interface Decoded {
  prefix: string;
  words: number[];
}
export function decode(str: string, LIMIT: number = BECH32_MAX_LIMIT): Decoded {
  if (str.length < BECH32_MIN_LIMIT || (LIMIT !== null && str.length > LIMIT))
    throw new Error('Invalid hash length');

  let lowered = str.toLowerCase(),
    uppered = str.toUpperCase();
  if (str !== lowered && str !== uppered) throw new Error('Mixed-case hash');
  str = lowered;

  let split = str.lastIndexOf(BECH32_SEPARATOR);
  if (split === -1) throw new Error('No separator character');
  if (split === 0) throw new Error('Missing prefix');

  let prefix = str.slice(0, split);
  let dataChars = str.slice(split + 1);
  if (dataChars.length < 6) throw new Error('Data too short');

  let chk = prefixChk(prefix),
    data = [] as number[];
  for (let i = 0; i < dataChars.length; i++) {
    const v = ALPHABET_MAP[dataChars[i]];
    if (v === undefined) throw new Error('Invalid char inside hash');
    chk = polymodStep(chk) ^ v;
    // not in the checksum?
    if (i + 6 >= dataChars.length) continue;
    data.push(v);
  }
  if (chk !== 1) throw new Error('Invalid checksum');
  return { prefix, words: data };
}

export function decodeUnsafe(str: string, LIMIT: number = BECH32_MAX_LIMIT) {
  try {
    return decode(str, LIMIT);
  } catch (error) {
    return;
  }
}

function convertBits(
  data: ArrayLike<number>,
  fromBits: number,
  toBits: number,
  padding: boolean
): number[] {
  let value = 0,
    bits = 0,
    maxV = (1 << toBits) - 1,
    res = [] as number[];
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    value = (value << fromBits) | d;
    bits += fromBits;

    while (bits >= toBits) {
      bits -= toBits;
      res.push((value >> bits) & maxV);
    }
  }

  if (padding) {
    if (bits > 0) res.push((value << (toBits - bits)) & maxV);
  } else {
    if (bits >= fromBits) throw new Error('Excess padding');
    if ((value << (toBits - bits)) & maxV) throw new Error('Non-zero padding');
  }
  return res;
}

export function toWords(bytes: ArrayLike<number>): number[] {
  return convertBits(bytes, 8, 5, true);
}

export function fromWords(words: ArrayLike<number>): number[] {
  return convertBits(words, 5, 8, false);
}

export function encodeBase32(prefix: string, data: Uint8Array, LIMIT: number = BECH32_MAX_LIMIT) {
  return encode(prefix, toWords(data), LIMIT);
}

export function decodeBase32(str: string, LIMIT: number = BECH32_MAX_LIMIT): Decoded {
  let { prefix, words } = decode(str, LIMIT);
  const data = fromWords(words);
  return { prefix, words: data };
}
