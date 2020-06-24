'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBase32 = exports.encodeBase32 = exports.fromWords = exports.toWords = exports.decode = exports.encode = void 0;
const BECH32_SEPARATOR = '1';
const BECH32_MAX_LIMIT = 90;
const BECH32_MIN_LIMIT = 8;
const ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const ALPHABET_MAP = [...ALPHABET].reduce((res, el, i) => ({ ...res, [el]: i }), {});
const GENERATORS = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
function polymodStep(pre) {
    var b = pre >> 25;
    let res = (pre & 0x1ffffff) << 5;
    for (let i = 0; i < GENERATORS.length; i++)
        res ^= -((b >> i) & 1) & GENERATORS[i];
    return res;
}
function prefixChk(prefix) {
    let chk = 1;
    for (let char of prefix) {
        let code = char.charCodeAt(0);
        if (code < 33 || code > 126)
            throw new Error('Invalid prefix');
        chk = polymodStep(chk) ^ (code >> 5);
    }
    chk = polymodStep(chk);
    for (let char of prefix)
        chk = polymodStep(chk) ^ (char.charCodeAt(0) & 0x1f);
    return chk;
}
function encode(prefix, data, LIMIT = BECH32_MAX_LIMIT) {
    if (LIMIT !== null && prefix.length + 7 + data.length > LIMIT)
        throw new TypeError('Exceeds length limit');
    prefix = prefix.toLowerCase();
    let chk = prefixChk(prefix);
    let result = prefix + BECH32_SEPARATOR;
    for (let x of data) {
        if (x >> 5 !== 0)
            throw new Error('Not 5-bit byte');
        chk = polymodStep(chk) ^ x;
        result += ALPHABET[x];
    }
    for (let i = 0; i < 6; i++)
        chk = polymodStep(chk);
    chk ^= 1;
    for (let i = 0; i < 6; i++)
        result += ALPHABET[(chk >> ((5 - i) * 5)) & 0x1f];
    return result;
}
exports.encode = encode;
function decode(str, LIMIT = BECH32_MAX_LIMIT) {
    if (str.length < BECH32_MIN_LIMIT || (LIMIT !== null && str.length > LIMIT))
        throw new Error('Invalid hash length');
    let lowered = str.toLowerCase(), uppered = str.toUpperCase();
    if (str !== lowered && str !== uppered)
        throw new Error('Mixed-case hash');
    str = lowered;
    let split = str.lastIndexOf(BECH32_SEPARATOR);
    if (split === -1)
        throw new Error('No separator character');
    if (split === 0)
        throw new Error('Missing prefix');
    let prefix = str.slice(0, split);
    let dataChars = str.slice(split + 1);
    if (dataChars.length < 6)
        throw new Error('Invalid hash length');
    let chk = prefixChk(prefix), data = [];
    for (let i = 0; i < dataChars.length; i++) {
        var v = ALPHABET_MAP[dataChars[i]];
        if (v === undefined)
            throw new Error('Invalid char inside hash');
        chk = polymodStep(chk) ^ v;
        if (i + 6 >= dataChars.length)
            continue;
        data.push(v);
    }
    if (chk !== 1)
        throw new Error('Invalid checksum');
    const words = new Uint8Array(data);
    return { prefix, words };
}
exports.decode = decode;
function convertBits(data, fromBits, toBits, padding) {
    let value = 0, bits = 0, maxV = (1 << toBits) - 1, res = [];
    for (let d of data) {
        value = (value << fromBits) | d;
        bits += fromBits;
        while (bits >= toBits) {
            bits -= toBits;
            res.push((value >> bits) & maxV);
        }
    }
    if (padding) {
        if (bits > 0)
            res.push((value << (toBits - bits)) & maxV);
    }
    else {
        if (bits >= fromBits)
            throw new Error('Excess padding');
        if ((value << (toBits - bits)) & maxV)
            throw new Error('Non-zero padding');
    }
    return new Uint8Array(res);
}
function toWords(bytes) {
    if (!(bytes instanceof Uint8Array))
        bytes = Uint8Array.from(bytes);
    return convertBits(bytes, 8, 5, true);
}
exports.toWords = toWords;
function fromWords(words) {
    return convertBits(words, 5, 8, false);
}
exports.fromWords = fromWords;
function encodeBase32(prefix, data, LIMIT = BECH32_MAX_LIMIT) {
    return encode(prefix, toWords(data), LIMIT);
}
exports.encodeBase32 = encodeBase32;
function decodeBase32(str, LIMIT = BECH32_MAX_LIMIT) {
    let { prefix, words } = decode(str, LIMIT);
    const data = fromWords(words);
    return { prefix, words: data };
}
exports.decodeBase32 = decodeBase32;
