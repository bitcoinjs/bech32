// This is a simple example file that shows the usage of this library in TypeScript.
// When you open it in Visual Studio Code, the built-in TypeScript server should run all
// the type checks. For manually runtime testing you can use ts-node to run this file.

import { bech32 } from '..';

function encodeUint8Array(prefix: string, data: Uint8Array): string {
  const address = bech32.encode(prefix, bech32.toWords(data));
  return address;
}

function decodeUint8Array(address: string): { readonly prefix: string; readonly data: Uint8Array } {
  const decodedAddress = bech32.decode(address);
  return {
    prefix: decodedAddress.prefix,
    data: new Uint8Array(bech32.fromWords(decodedAddress.words)),
  };
}

function encodeBuffer(prefix: string, data: Buffer): string {
  const address = bech32.encode(prefix, bech32.toWords(data));
  return address;
}

function decodeBuffer(address: string): { readonly prefix: string; readonly data: Buffer } {
  const decodedAddress = bech32.decode(address);
  return {
    prefix: decodedAddress.prefix,
    data: Buffer.from(bech32.fromWords(decodedAddress.words)),
  };
}

function encodeUnsafe(prefix: string, data: Uint8Array): string | undefined {
  const address = bech32.encode(prefix, bech32.toWords(data));
  return address;
}

function decodeUnsafe(address: string): { readonly prefix: string; readonly data: Uint8Array } {
  const decodedAddress = bech32.decodeUnsafe(address)!;
  return {
    prefix: decodedAddress.prefix,
    data: new Uint8Array(bech32.fromWordsUnsafe(decodedAddress.words)!),
  };
}

function main(): void {
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
    const decoded = decodeUnsafe(address!);
    console.log(prefix, data, address, decoded);
  }
}

main();
