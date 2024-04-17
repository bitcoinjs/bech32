declare function toWords(bytes: ArrayLike<number>): number[];
declare function fromWordsUnsafe(words: ArrayLike<number>): number[] | undefined;
declare function fromWords(words: ArrayLike<number>): number[];
declare const bech32: BechLib;
declare const bech32m: BechLib;
interface Decoded {
    prefix: string;
    words: number[];
}
interface BechLib {
    decodeUnsafe: (str: string, LIMIT?: number | undefined) => Decoded | undefined;
    decode: (str: string, LIMIT?: number | undefined) => Decoded;
    encode: (prefix: string, words: ArrayLike<number>, LIMIT?: number | undefined) => string;
    toWords: typeof toWords;
    fromWordsUnsafe: typeof fromWordsUnsafe;
    fromWords: typeof fromWords;
}

export { type BechLib, type Decoded, bech32, bech32m };
