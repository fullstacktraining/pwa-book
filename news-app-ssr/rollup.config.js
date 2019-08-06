import babel from 'rollup-plugin-babel';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: './service-worker.mjs',
  plugins: [
    resolve(),
    babel({
      presets: [['@babel/preset-env', {
        targets: {
          browsers: ['chrome >= 56']
        },
        modules: false,
      }]],
    }),
    compiler(),
  ],
  output: {
    file: path.join(__dirname, 'service-worker.js'),
    format: 'iife'
  }
};