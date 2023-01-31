import commonjs from '@rollup/plugin-commonjs';
// rollup 没法直接引入第三方包到 bundle
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';

// rollup.config.js
// 多入口
export default (env = 'production') => {
  return [
    {
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
      external: ['child_process'],
    },

    // 导出vite插件
    {
      input: './src/vite/index.ts',
      output: {
        file: './lib/vite.esm.js',
        format: 'es',
      },
      plugins: [resolve(), typescript(), commonjs()],
      external: ['child_process'],
    },
    {
      input: './src/vite/index.ts',
      output: {
        // todo: 查一下commonjs只能用cjs来使用吗
        file: './lib/vite.cjs',
        format: 'cjs',
        // todo: 这个用来干嘛的
        exports: 'auto',
      },
      plugins: [resolve(), typescript(), commonjs()],
      external: ['child_process'],
    },
  ];
};
