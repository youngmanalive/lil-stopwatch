import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'default',
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
    },
    {
      file: 'dist/lil-stopwatch.min.js',
      format: 'umd',
      name: 'LilStopwatch',
      exports: 'default',
      esModule: false,
      plugins: [terser()],
    },
  ],
  plugins: [del({ targets: 'dist/*' }), typescript()],
});
