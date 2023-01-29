import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';

// rollup.config.js
export default {
  input: './src/index.ts',

  output: [
    {
      file: './lib/index.esm.js',
      format: 'es',
    },
    {
      file: './lib/index.cjs.js',
      format: 'cjs',
    },
  ],
  plugins: [del({ targets: 'lib/*' }), resolve(), typescript(), commonjs()],
};
