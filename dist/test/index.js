'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const bech32Lib = require("../");
const tape = require("tape");
const fixtures = require('../../src/test/fixtures');
function testValidFixture(f, bech32) {
    if (f.hex) {
        tape(`fromWords/toWords ${f.hex}`, (t) => {
            t.plan(3);
            const words = bech32.toWords(Buffer.from(f.hex, 'hex'));
            const bytes = Buffer.from(bech32.fromWords(f.words));
            const bytes2 = Buffer.from(bech32.fromWordsUnsafe(f.words));
            t.same(words, f.words);
            t.same(bytes.toString('hex'), f.hex);
            t.same(bytes2.toString('hex'), f.hex);
        });
    }
    tape(`encode ${f.prefix} ${f.hex || f.words}`, (t) => {
        t.plan(1);
        t.strictEqual(bech32.encode(f.prefix, f.words, f.limit), f.string.toLowerCase());
    });
    tape(`decode ${f.string}`, (t) => {
        t.plan(2);
        const expected = {
            prefix: f.prefix.toLowerCase(),
            words: f.words,
        };
        t.same(bech32.decodeUnsafe(f.string, f.limit), expected);
        t.same(bech32.decode(f.string, f.limit), expected);
    });
    tape(`fails for ${f.string} with 1 bit flipped`, (t) => {
        t.plan(2);
        const buffer = Buffer.from(f.string, 'utf8');
        buffer[f.string.lastIndexOf('1') + 1] ^= 0x1; // flip a bit, after the prefix
        const str = buffer.toString('utf8');
        t.equal(bech32.decodeUnsafe(str, f.limit), undefined);
        t.throws(() => {
            bech32.decode(str, f.limit);
        }, new RegExp('Invalid checksum|Unknown character'));
    });
    // === compare of objects compares reference in memory, so this works
    const wrongBech32 = bech32 === bech32Lib.bech32 ? bech32Lib.bech32m : bech32Lib.bech32;
    tape(`fails for ${f.string} with wrong encoding`, (t) => {
        t.plan(2);
        t.equal(wrongBech32.decodeUnsafe(f.string, f.limit), undefined);
        t.throws(() => {
            wrongBech32.decode(f.string, f.limit);
        }, new RegExp('Invalid checksum'));
    });
}
function testInvalidFixture(f, bech32) {
    if (f.prefix !== undefined && f.words !== undefined) {
        tape(`encode fails with (${f.exception})`, (t) => {
            t.plan(1);
            t.throws(() => {
                bech32.encode(f.prefix, f.words);
            }, new RegExp(f.exception));
        });
    }
    if (f.string !== undefined || f.stringHex) {
        const str = f.string || Buffer.from(f.stringHex, 'hex').toString('binary');
        tape(`decode fails for ${str} (${f.exception})`, (t) => {
            t.plan(2);
            t.equal(bech32.decodeUnsafe(str), undefined);
            t.throws(() => {
                bech32.decode(str);
            }, new RegExp(f.exception));
        });
    }
}
fixtures.bech32.valid.forEach((f) => {
    testValidFixture(f, bech32Lib.bech32);
});
fixtures.bech32.invalid.forEach((f) => {
    testInvalidFixture(f, bech32Lib.bech32);
});
fixtures.bech32m.valid.forEach((f) => {
    testValidFixture(f, bech32Lib.bech32m);
});
fixtures.bech32m.invalid.forEach((f) => {
    testInvalidFixture(f, bech32Lib.bech32m);
});
fixtures.fromWords.invalid.forEach((f) => {
    tape(`fromWords fails with ${f.exception}`, (t) => {
        t.plan(2);
        t.equal(bech32Lib.bech32.fromWordsUnsafe(f.words), undefined);
        t.throws(() => {
            bech32Lib.bech32.fromWords(f.words);
        }, new RegExp(f.exception));
    });
});
tape('toWords/toWordsUnsafe accept bytes as ArrayLike<number>', (t) => {
    // Ensures that only the two operations from
    //   interface ArrayLike<T> {
    //     readonly length: number;
    //     readonly [n: number]: T;
    //   }
    // are used, which are common for the typical binary types Uint8Array, Buffer and
    // Array<number>.
    const bytes = {
        length: 5,
        0: 0x00,
        1: 0x11,
        2: 0x22,
        3: 0x33,
        4: 0xff,
    };
    const words = bech32Lib.bech32.toWords(bytes);
    t.plan(1);
    t.same(words, [0, 0, 8, 18, 4, 12, 31, 31]);
});
