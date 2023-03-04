import { resolve } from 'node:path'
import dts from 'rollup-plugin-dts'
import fg from 'fast-glob'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { packages } from '../meta/packages'

const dtsPlugin = [
  nodeResolve(),
  dts({
    compilerOptions: {
      preserveSymlinks: false
    }
  })
]

const externals = ['solid-js', 'solid-js/types/reactive/signal', 'solid-js/store']
let configs: any = [
  {
    input: `packages/solid-to-vue/src/index.ts`,
    output: {
      dir: `packages/solid-to-vue/dist`,
      format: 'es'
    },
    plugins: dtsPlugin as any,
    external: [...externals]
  }
]

configs = [
  ...configs,
  ...packages.slice(1).map(pkg => {
    const files = fg
      .sync('**/*.ts', {
        cwd: resolve(`packages/${pkg.name}/src`),
        ignore: ['**/demo.tsx', '**/index.test.ts', '**/index.test.tsx']
      })
      .map(item => `packages/${pkg.name}/src/${item}`)
    return {
      input: files,
      output: {
        dir: 'dist',
        format: 'es'
      },
      plugins: dtsPlugin,
      external: [...externals, ...(pkg.external ?? [])]
    }
  })
]

export default configs
