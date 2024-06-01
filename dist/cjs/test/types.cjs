"use strict";
// This is a simple example file that shows the usage of this library in TypeScript.
// When you open it in Visual Studio Code, the built-in TypeScript server should run all
// the type checks. For manually runtime testing you can use ts-node to run this file.
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const index_cjs_1 = require("../index.cjs");
function encodeUint8Array(prefix, data) {
    const address = index_cjs_1.bech32.encode(prefix, index_cjs_1.bech32.toWords(data));
    return address;
}
function decodeUint8Array(address) {
    const decodedAddress = index_cjs_1.bech32.decode(address);
    return {
        prefix: decodedAddress.prefix,
        data: new Uint8Array(index_cjs_1.bech32.fromWords(decodedAddress.words)),
    };
}
function encodeBuffer(prefix, data) {
    const address = index_cjs_1.bech32.encode(prefix, index_cjs_1.bech32.toWords(data));
    return address;
}
function decodeBuffer(address) {
    const decodedAddress = index_cjs_1.bech32.decode(address);
    return {
        prefix: decodedAddress.prefix,
        data: Buffer.from(index_cjs_1.bech32.fromWords(decodedAddress.words)),
    };
}
function encodeUnsafe(prefix, data) {
    const address = index_cjs_1.bech32.encode(prefix, index_cjs_1.bech32.toWords(data));
    return address;
}
function decodeUnsafe(address) {
    const decodedAddress = index_cjs_1.bech32.decodeUnsafe(address);
    return {
        prefix: decodedAddress.prefix,
        data: new Uint8Array(index_cjs_1.bech32.fromWordsUnsafe(decodedAddress.words)),
    };
}
function main() {
    {
        const prefix = 'foo';
        const data = new Uint8Array([0x00, 0x11, 0x22]);
        const address = encodeUint8Array(prefix, data);
        const decoded = decodeUint8Array(address);
        console.log(prefix, data, address, decoded);
    }
    {
        const prefix = 'foo';
        const data = Buffer.from([0x00, 0x11, 0x22]);
        const address = encodeBuffer(prefix, data);
        const decoded = decodeBuffer(address);
        console.log(prefix, data, address, decoded);
    }
    {
        const prefix = 'foo';
        const data = new Uint8Array([0x00, 0x11, 0x22]);
        const address = encodeUnsafe(prefix, data);
        const decoded = decodeUnsafe(address);
        console.log(prefix, data, address, decoded);
    }
}
main();
