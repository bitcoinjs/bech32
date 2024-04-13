'use strict';
import * as bech32Lib from '../';
import * as tape from 'tape';
import * as uint8arraytools from 'uint8array-tools';
const fixtures = require('../../src/test/fixtures');

type Fixture = { string: string; prefix: string; hex: string; words: number[]; limit?: number };
type InvalidFixture = {
  string: string;
  stringHex: string;
  prefix: string;
  hex: string;
  words: number[];
  limit?: number;
  exception: string;
};

function testValidFixture(f: Fixture, bech32: any): void {
  if (f.hex) {
    tape(`fromWords/toWords ${f.hex}`, (t): void => {
      t.plan(3);

      const words = bech32.toWords(uint8arraytools.fromHex(f.hex));
      const bytes = uint8arraytools.fromUtf8(bech32.fromWords(f.words));
      const bytes2 = uint8arraytools.fromUtf8(bech32.fromWordsUnsafe(f.words));
      t.same(words, f.words);
      t.same(uint8arraytools.toHex(bytes), f.hex);
      t.same(uint8arraytools.toHex(bytes), f.hex);
    });
  }

  tape(`encode ${f.prefix} ${f.hex || f.words}`, (t): void => {
    t.plan(1);
    t.strictEqual(bech32.encode(f.prefix, f.words, f.limit), f.string.toLowerCase());
  });

  tape(`decode ${f.string}`, (t): void => {
    t.plan(2);

    const expected = {
      prefix: f.prefix.toLowerCase(),
      words: f.words,
    };
    t.same(bech32.decodeUnsafe(f.string, f.limit), expected);
    t.same(bech32.decode(f.string, f.limit), expected);
  });

  tape(`fails for ${f.string} with 1 bit flipped`, (t): void => {
    t.plan(2);

    const uint8array = uint8arraytools.fromUtf8(f.string);
    uint8array[f.string.lastIndexOf('1') + 1] ^= 0x1; // flip a bit, after the prefix
    const str = uint8arraytools.toUtf8(uint8array);
    t.equal(bech32.decodeUnsafe(str, f.limit), undefined);
    t.throws((): void => {
      bech32.decode(str, f.limit);
    }, new RegExp('Invalid checksum|Unknown character'));
  });

  // === compare of objects compares reference in memory, so this works
  const wrongBech32 = bech32 === bech32Lib.bech32 ? bech32Lib.bech32m : bech32Lib.bech32;
  tape(`fails for ${f.string} with wrong encoding`, (t): void => {
    t.plan(2);

    t.equal(wrongBech32.decodeUnsafe(f.string, f.limit), undefined);
    t.throws((): void => {
      wrongBech32.decode(f.string, f.limit);
    }, new RegExp('Invalid checksum'));
  });
}

function testInvalidFixture(f: InvalidFixture, bech32: any): void {
  if (f.prefix !== undefined && f.words !== undefined) {
    tape(`encode fails with (${f.exception})`, (t): void => {
      t.plan(1);

      t.throws((): void => {
        bech32.encode(f.prefix, f.words);
      }, new RegExp(f.exception));
    });
  }

  if (f.string !== undefined || f.stringHex) {
    const str = f.string || uint8arraytools.toUtf8(uint8arraytools.fromHex(f.stringHex));

    tape(`decode fails for ${str} (${f.exception})`, (t): void => {
      t.plan(2);
      t.equal(bech32.decodeUnsafe(str), undefined);
      t.throws((): void => {
        bech32.decode(str);
      }, new RegExp(f.exception));
    });
  }
}

fixtures.bech32.valid.forEach((f: Fixture): void => {
  testValidFixture(f, bech32Lib.bech32);
});

fixtures.bech32.invalid.forEach((f: InvalidFixture): void => {
  testInvalidFixture(f, bech32Lib.bech32);
});

fixtures.bech32m.valid.forEach((f: Fixture): void => {
  testValidFixture(f, bech32Lib.bech32m);
});

fixtures.bech32m.invalid.forEach((f: InvalidFixture): void => {
  testInvalidFixture(f, bech32Lib.bech32m);
});

fixtures.fromWords.invalid.forEach((f: InvalidFixture): void => {
  tape(`fromWords fails with ${f.exception}`, (t): void => {
    t.plan(2);
    t.equal(bech32Lib.bech32.fromWordsUnsafe(f.words), undefined);
    t.throws((): void => {
      bech32Lib.bech32.fromWords(f.words);
    }, new RegExp(f.exception));
  });
});

tape('toWords/toWordsUnsafe accept bytes as ArrayLike<number>', (t): void => {
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
