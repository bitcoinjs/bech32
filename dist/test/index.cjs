"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/test/fixtures.json
var require_fixtures = __commonJS({
  "src/test/fixtures.json"(exports2, module2) {
    module2.exports = {
      fromWords: {
        invalid: [
          {
            exception: "Excess padding",
            words: [14, 20, 15, 7, 13, 26, 0, 25, 18, 6, 11, 13, 8, 21, 4, 20, 3, 17, 2, 29, 3, 0]
          },
          {
            exception: "Non-zero padding",
            words: [3, 1, 17, 17, 8, 15, 0, 20, 24, 20, 11, 6, 16, 1, 5, 29, 3, 4, 16, 3, 6, 21, 22, 26, 2, 13, 22, 9, 16, 21, 19, 24, 25, 21, 6, 18, 15, 8, 13, 24, 24, 24, 25, 9, 12, 1, 4, 16, 6, 9, 17, 1]
          }
        ]
      },
      bech32: {
        valid: [
          {
            string: "A12UEL5L",
            prefix: "A",
            hex: "",
            words: []
          },
          {
            string: "an83characterlonghumanreadablepartthatcontainsthenumber1andtheexcludedcharactersbio1tt5tgs",
            prefix: "an83characterlonghumanreadablepartthatcontainsthenumber1andtheexcludedcharactersbio",
            hex: "",
            words: []
          },
          {
            string: "abcdef1qpzry9x8gf2tvdw0s3jn54khce6mua7lmqqqxw",
            prefix: "abcdef",
            hex: "00443214c74254b635cf84653a56d7c675be77df",
            words: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
          },
          {
            string: "11qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqc8247j",
            prefix: "1",
            hex: "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            words: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            string: "split1checkupstagehandshakeupstreamerranterredcaperred2y9e3w",
            prefix: "split",
            hex: "c5f38b70305f519bf66d85fb6cf03058f3dde463ecd7918f2dc743918f2d",
            words: [24, 23, 25, 24, 22, 28, 1, 16, 11, 29, 8, 25, 23, 29, 19, 13, 16, 23, 29, 22, 25, 28, 1, 16, 11, 3, 25, 29, 27, 25, 3, 3, 29, 19, 11, 25, 3, 3, 25, 13, 24, 29, 1, 25, 3, 3, 25, 13]
          },
          {
            string: "11qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq978ear",
            prefix: "1",
            hex: "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            words: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            limit: 300
          }
        ],
        invalid: [
          {
            string: "A12Uel5l",
            exception: "Mixed-case string A12Uel5l"
          },
          {
            string: " 1nwldj5",
            exception: "Invalid prefix"
          },
          {
            string: "abc1rzg",
            exception: "abc1rzg too short"
          },
          {
            string: "an84characterslonghumanreadablepartthatcontainsthenumber1andtheexcludedcharactersbio1569pvx",
            exception: "Exceeds length limit"
          },
          {
            string: "x1b4n0q5v",
            exception: "Unknown character b"
          },
          {
            string: "1pzry9x0s0muk",
            exception: "Missing prefix"
          },
          {
            string: "pzry9x0s0muk",
            exception: "No separator character"
          },
          {
            string: "abc1rzgt4",
            exception: "Data too short"
          },
          {
            string: "s1vcsyn",
            exception: "s1vcsyn too short"
          },
          {
            prefix: "abc",
            words: [128],
            exception: "Non 5-bit word"
          },
          {
            prefix: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzfoobarfoobar",
            words: [128],
            exception: "Exceeds length limit"
          },
          {
            prefix: "foobar",
            words: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
            exception: "Exceeds length limit"
          },
          {
            prefix: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzfoobarfoobarfoobarfoobar",
            words: [128],
            limit: 104,
            exception: "Exceeds length limit"
          },
          {
            string: "11qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqc8247j",
            exception: "Exceeds length limit"
          },
          {
            prefix: "abc\xFF",
            words: [18],
            exception: "Invalid prefix"
          },
          {
            string: "li1dgmt3",
            exception: "Data too short"
          },
          {
            stringHex: "6465316c67377774ff",
            exception: "Unknown character"
          }
        ]
      },
      bech32m: {
        valid: [
          {
            string: "A1LQFN3A",
            prefix: "A",
            hex: "",
            words: []
          },
          {
            string: "a1lqfn3a",
            prefix: "a",
            hex: "",
            words: []
          },
          {
            string: "an83characterlonghumanreadablepartthatcontainsthetheexcludedcharactersbioandnumber11sg7hg6",
            prefix: "an83characterlonghumanreadablepartthatcontainsthetheexcludedcharactersbioandnumber1",
            hex: "",
            words: []
          },
          {
            string: "abcdef1l7aum6echk45nj3s0wdvt2fg8x9yrzpqzd3ryx",
            prefix: "abcdef",
            hex: "ffbbcdeb38bdab49ca307b9ac5a928398a418820",
            words: [31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
          },
          {
            string: "11llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllludsr8",
            prefix: "1",
            words: [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31]
          },
          {
            string: "split1checkupstagehandshakeupstreamerranterredcaperredlc445v",
            prefix: "split",
            hex: "c5f38b70305f519bf66d85fb6cf03058f3dde463ecd7918f2dc743918f2d",
            words: [24, 23, 25, 24, 22, 28, 1, 16, 11, 29, 8, 25, 23, 29, 19, 13, 16, 23, 29, 22, 25, 28, 1, 16, 11, 3, 25, 29, 27, 25, 3, 3, 29, 19, 11, 25, 3, 3, 25, 13, 24, 29, 1, 25, 3, 3, 25, 13]
          },
          {
            string: "?1v759aa",
            prefix: "?",
            hex: "",
            words: []
          },
          {
            string: "11qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqszh4cp",
            prefix: "1",
            hex: "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            words: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            limit: 300
          }
        ],
        invalid: [
          {
            string: "A1LQfN3A",
            exception: "Mixed-case string A1LQfN3A"
          },
          {
            string: " 1xj0phk",
            exception: "Invalid prefix \\( \\)"
          },
          {
            string: "abc1rzg",
            exception: "abc1rzg too short"
          },
          {
            string: "an84characterslonghumanreadablepartthatcontainsthetheexcludedcharactersbioandnumber11d6pts4",
            exception: "Exceeds length limit"
          },
          {
            string: "qyrz8wqd2c9m",
            exception: "No separator character for qyrz8wqd2c9m"
          },
          {
            string: "1qyrz8wqd2c9m",
            exception: "Missing prefix for 1qyrz8wqd2c9m"
          },
          {
            string: "y1b0jsk6g",
            exception: "Unknown character b"
          },
          {
            string: "lt1igcx5c0",
            exception: "Unknown character i"
          },
          {
            string: "in1muywd",
            exception: "Data too short"
          },
          {
            string: "mm1crxm3i",
            exception: "Unknown character i"
          },
          {
            string: "au1s5cgom",
            exception: "Unknown character o"
          },
          {
            string: "M1VUXWEZ",
            exception: "Invalid checksum for m1vuxwez"
          },
          {
            string: "16plkw9",
            exception: "16plkw9 too short"
          },
          {
            string: "1p2gdwpf",
            exception: "Missing prefix for 1p2gdwpf"
          },
          {
            prefix: "abc",
            words: [128],
            exception: "Non 5-bit word"
          },
          {
            prefix: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzfoobarfoobar",
            words: [128],
            exception: "Exceeds length limit"
          },
          {
            prefix: "foobar",
            words: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
            exception: "Exceeds length limit"
          },
          {
            prefix: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzfoobarfoobarfoobarfoobar",
            words: [128],
            limit: 104,
            exception: "Exceeds length limit"
          },
          {
            string: "11qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqc8247j",
            exception: "Exceeds length limit"
          },
          {
            prefix: "abc\xFF",
            words: [18],
            exception: "Invalid prefix \\(abc\xFF\\)"
          },
          {
            string: "in1muywd",
            exception: "Data too short"
          },
          {
            stringHex: "6465316c67377774ff",
            exception: "Unknown character "
          }
        ]
      }
    };
  }
});

// src/index.ts
var ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
var ALPHABET_MAP = {};
for (let z = 0; z < ALPHABET.length; z++) {
  const x = ALPHABET.charAt(z);
  ALPHABET_MAP[x] = z;
}
function polymodStep(pre) {
  const b = pre >> 25;
  return (pre & 33554431) << 5 ^ -(b >> 0 & 1) & 996825010 ^ -(b >> 1 & 1) & 642813549 ^ -(b >> 2 & 1) & 513874426 ^ -(b >> 3 & 1) & 1027748829 ^ -(b >> 4 & 1) & 705979059;
}
function prefixChk(prefix) {
  let chk = 1;
  for (let i = 0; i < prefix.length; ++i) {
    const c = prefix.charCodeAt(i);
    if (c < 33 || c > 126)
      return "Invalid prefix (" + prefix + ")";
    chk = polymodStep(chk) ^ c >> 5;
  }
  chk = polymodStep(chk);
  for (let i = 0; i < prefix.length; ++i) {
    const v = prefix.charCodeAt(i);
    chk = polymodStep(chk) ^ v & 31;
  }
  return chk;
}
function convert(data, inBits, outBits, pad) {
  let value = 0;
  let bits = 0;
  const maxV = (1 << outBits) - 1;
  const result = [];
  for (let i = 0; i < data.length; ++i) {
    value = value << inBits | data[i];
    bits += inBits;
    while (bits >= outBits) {
      bits -= outBits;
      result.push(value >> bits & maxV);
    }
  }
  if (pad) {
    if (bits > 0) {
      result.push(value << outBits - bits & maxV);
    }
  } else {
    if (bits >= inBits)
      return "Excess padding";
    if (value << outBits - bits & maxV)
      return "Non-zero padding";
  }
  return result;
}
function toWords(bytes) {
  return convert(bytes, 8, 5, true);
}
function fromWordsUnsafe(words) {
  const res = convert(words, 5, 8, false);
  if (Array.isArray(res))
    return res;
}
function fromWords(words) {
  const res = convert(words, 5, 8, false);
  if (Array.isArray(res))
    return res;
  throw new Error(res);
}
function getLibraryFromEncoding(encoding) {
  let ENCODING_CONST;
  if (encoding === "bech32") {
    ENCODING_CONST = 1;
  } else {
    ENCODING_CONST = 734539939;
  }
  function encode(prefix, words, LIMIT) {
    LIMIT = LIMIT || 90;
    if (prefix.length + 7 + words.length > LIMIT)
      throw new TypeError("Exceeds length limit");
    prefix = prefix.toLowerCase();
    let chk = prefixChk(prefix);
    if (typeof chk === "string")
      throw new Error(chk);
    let result = prefix + "1";
    for (let i = 0; i < words.length; ++i) {
      const x = words[i];
      if (x >> 5 !== 0)
        throw new Error("Non 5-bit word");
      chk = polymodStep(chk) ^ x;
      result += ALPHABET.charAt(x);
    }
    for (let i = 0; i < 6; ++i) {
      chk = polymodStep(chk);
    }
    chk ^= ENCODING_CONST;
    for (let i = 0; i < 6; ++i) {
      const v = chk >> (5 - i) * 5 & 31;
      result += ALPHABET.charAt(v);
    }
    return result;
  }
  function __decode(str, LIMIT) {
    LIMIT = LIMIT || 90;
    if (str.length < 8)
      return str + " too short";
    if (str.length > LIMIT)
      return "Exceeds length limit";
    const lowered = str.toLowerCase();
    const uppered = str.toUpperCase();
    if (str !== lowered && str !== uppered)
      return "Mixed-case string " + str;
    str = lowered;
    const split = str.lastIndexOf("1");
    if (split === -1)
      return "No separator character for " + str;
    if (split === 0)
      return "Missing prefix for " + str;
    const prefix = str.slice(0, split);
    const wordChars = str.slice(split + 1);
    if (wordChars.length < 6)
      return "Data too short";
    let chk = prefixChk(prefix);
    if (typeof chk === "string")
      return chk;
    const words = [];
    for (let i = 0; i < wordChars.length; ++i) {
      const c = wordChars.charAt(i);
      const v = ALPHABET_MAP[c];
      if (v === void 0)
        return "Unknown character " + c;
      chk = polymodStep(chk) ^ v;
      if (i + 6 >= wordChars.length)
        continue;
      words.push(v);
    }
    if (chk !== ENCODING_CONST)
      return "Invalid checksum for " + str;
    return { prefix, words };
  }
  function decodeUnsafe(str, LIMIT) {
    const res = __decode(str, LIMIT);
    if (typeof res === "object")
      return res;
  }
  function decode(str, LIMIT) {
    const res = __decode(str, LIMIT);
    if (typeof res === "object")
      return res;
    throw new Error(res);
  }
  return {
    decodeUnsafe,
    decode,
    encode,
    toWords,
    fromWordsUnsafe,
    fromWords
  };
}
var bech32 = getLibraryFromEncoding("bech32");
var bech32m = getLibraryFromEncoding("bech32m");

// src/test/index.ts
var import_tape = __toESM(require("tape"), 1);
var fixtures = require_fixtures();
function testValidFixture(f, bech322) {
  if (f.hex) {
    (0, import_tape.default)(`fromWords/toWords ${f.hex}`, (t) => {
      t.plan(3);
      const words = bech322.toWords(Buffer.from(f.hex, "hex"));
      const bytes = Buffer.from(bech322.fromWords(f.words));
      const bytes2 = Buffer.from(bech322.fromWordsUnsafe(f.words));
      t.same(words, f.words);
      t.same(bytes.toString("hex"), f.hex);
      t.same(bytes2.toString("hex"), f.hex);
    });
  }
  (0, import_tape.default)(`encode ${f.prefix} ${f.hex || f.words}`, (t) => {
    t.plan(1);
    t.strictEqual(bech322.encode(f.prefix, f.words, f.limit), f.string.toLowerCase());
  });
  (0, import_tape.default)(`decode ${f.string}`, (t) => {
    t.plan(2);
    const expected = {
      prefix: f.prefix.toLowerCase(),
      words: f.words
    };
    t.same(bech322.decodeUnsafe(f.string, f.limit), expected);
    t.same(bech322.decode(f.string, f.limit), expected);
  });
  (0, import_tape.default)(`fails for ${f.string} with 1 bit flipped`, (t) => {
    t.plan(2);
    const buffer = Buffer.from(f.string, "utf8");
    buffer[f.string.lastIndexOf("1") + 1] ^= 1;
    const str = buffer.toString("utf8");
    t.equal(bech322.decodeUnsafe(str, f.limit), void 0);
    t.throws(() => {
      bech322.decode(str, f.limit);
    }, new RegExp("Invalid checksum|Unknown character"));
  });
  const wrongBech32 = bech322 === bech32 ? bech32m : bech32;
  (0, import_tape.default)(`fails for ${f.string} with wrong encoding`, (t) => {
    t.plan(2);
    t.equal(wrongBech32.decodeUnsafe(f.string, f.limit), void 0);
    t.throws(() => {
      wrongBech32.decode(f.string, f.limit);
    }, new RegExp("Invalid checksum"));
  });
}
function testInvalidFixture(f, bech322) {
  if (f.prefix !== void 0 && f.words !== void 0) {
    (0, import_tape.default)(`encode fails with (${f.exception})`, (t) => {
      t.plan(1);
      t.throws(() => {
        bech322.encode(f.prefix, f.words);
      }, new RegExp(f.exception));
    });
  }
  if (f.string !== void 0 || f.stringHex) {
    const str = f.string || Buffer.from(f.stringHex, "hex").toString("binary");
    (0, import_tape.default)(`decode fails for ${str} (${f.exception})`, (t) => {
      t.plan(2);
      t.equal(bech322.decodeUnsafe(str), void 0);
      t.throws(() => {
        bech322.decode(str);
      }, new RegExp(f.exception));
    });
  }
}
fixtures.bech32.valid.forEach((f) => {
  testValidFixture(f, bech32);
});
fixtures.bech32.invalid.forEach((f) => {
  testInvalidFixture(f, bech32);
});
fixtures.bech32m.valid.forEach((f) => {
  testValidFixture(f, bech32m);
});
fixtures.bech32m.invalid.forEach((f) => {
  testInvalidFixture(f, bech32m);
});
fixtures.fromWords.invalid.forEach((f) => {
  (0, import_tape.default)(`fromWords fails with ${f.exception}`, (t) => {
    t.plan(2);
    t.equal(bech32.fromWordsUnsafe(f.words), void 0);
    t.throws(() => {
      bech32.fromWords(f.words);
    }, new RegExp(f.exception));
  });
});
(0, import_tape.default)("toWords/toWordsUnsafe accept bytes as ArrayLike<number>", (t) => {
  const bytes = {
    length: 5,
    0: 0,
    1: 17,
    2: 34,
    3: 51,
    4: 255
  };
  const words = bech32.toWords(bytes);
  t.plan(1);
  t.same(words, [0, 0, 8, 18, 4, 12, 31, 31]);
});
