import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
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
  ],
  plugins: [del({ targets: 'dist/*' }), typescript()],
});
