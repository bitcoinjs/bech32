export declare function encode(prefix: string, data: ArrayLike<number>, LIMIT?: number): string;
export declare function encodeUnsafe(prefix: string, data: ArrayLike<number>, LIMIT?: number): string | undefined;
interface Decoded {
    prefix: string;
    words: number[];
}
export declare function decode(str: string, LIMIT?: number): Decoded;
export declare function decodeUnsafe(str: string, LIMIT?: number): Decoded | undefined;
export declare function toWords(bytes: ArrayLike<number>): number[];
export declare function fromWords(words: ArrayLike<number>): number[];
export declare function encodeBase32(prefix: string, data: Uint8Array, LIMIT?: number): string;
export declare function decodeBase32(str: string, LIMIT?: number): Decoded;
export {};
