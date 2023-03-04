import path from 'node:path'
import fg from 'fast-glob'
import { build, defineConfig, mergeConfig } from 'vite'

import { packages } from '../meta/packages'
import viteConfig from '../vite.config.mjs'
import type { PackageManifest } from '../meta'

function run() {
  packages.forEach(buildPackage)
}

async function buildPackage(pkg: PackageManifest) {
  const dir = path.join(__dirname, `../packages/${pkg.name}`)
  const dist = path.join(dir, './dist')
  const rootDir = path.join(dir, './src')
  let entry: Record<string, string> = {
    index: path.join(rootDir, './index.ts')
  }
  if (pkg.name === 'shared' || pkg.name === 'core') {
    entry['solid-to-vue'] = path.join(rootDir, './solid-to-vue.ts')
  }
  if (pkg.submodules) {
    entry = fg
      .sync('*/index.ts', { cwd: rootDir })
      .map(i => i.split('/')[0])
      .reduce<Record<string, string>>((entry, subModuleName) => {
        entry[subModuleName] = path.join(rootDir, subModuleName, 'index.ts')
        return entry
      }, entry)
  }
  await build(
    mergeConfig(
      viteConfig,
      defineConfig({
        build: {
          minify: false,
          outDir: dist,
          lib: {
            entry,
            formats: ['cjs', 'es']
          },
          rollupOptions: {
            external: ['solid-js', 'solid-js/types/reactive/signal', 'solid-js/store', ...(pkg.external ?? [])]
          }
        }
      })
    )
  )
}

run()
