import typescript from 'rollup-plugin-typescript2'
import copy from 'rollup-plugin-copy'

import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      // 'prop-types',
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
      copy({
        targets: [{ src: 'src/plugin.js', dest: 'lib' }],
      }),
    ],
  },
  {
    input: 'src/babel.ts',
    output: [
      {
        file: 'lib/babel.js',
        format: 'cjs',
      },
      {
        file: 'lib/babel.es.js',
        format: 'es',
      },
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
        tsconfigOverride: {
          compilerOptions: { declaration: false },
        },
      }),
    ],
  },
]
