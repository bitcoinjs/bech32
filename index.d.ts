export declare function encode(prefix: string, data: Uint8Array, LIMIT?: number | null): string;
export declare function encodeUnsafe(prefix: string, data: Uint8Array, LIMIT?: number | null): string | undefined;
declare type Decoded = {
    prefix: string;
    words: Uint8Array;
};
export declare function decode(str: string, LIMIT?: number | null): Decoded;
export declare function decodeUnsafe(str: string, LIMIT?: number | null): Decoded | undefined;
export declare function toWords(bytes: Uint8Array): Uint8Array;
export declare function fromWords(words: Uint8Array): Uint8Array;
export declare function encodeBase32(prefix: string, data: Uint8Array, LIMIT?: number | null): string;
export declare function decodeBase32(str: string, LIMIT?: number | null): Decoded;
export {};
