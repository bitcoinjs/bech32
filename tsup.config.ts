import {defineConfig} from 'tsup';
export default defineConfig({

    format: ['cjs', 'esm'],
    entry: ['./src/index.ts','./src/test/index.ts'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
});