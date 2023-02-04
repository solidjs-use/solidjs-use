import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'cypress'
import { mergeConfig } from 'vite'
import viteConfig from './vite.config.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  viewportWidth: 400,
  viewportHeight: 400,
  video: false,
  experimentalFetchPolyfill: true,
  includeShadowDom: true,
  component: {
    excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*', 'examples/**/*'],
    specPattern: 'packages/*/src/*/*.test.{ts,tsx}',
    devServer: {
      bundler: 'vite',
      framework: 'solidjs',
      viteConfig: mergeConfig(viteConfig, { publicDir: path.join(__dirname, './cypress/fixtures') })
    },
    experimentalSingleTabRunMode: true // 是否合并所有文件为单个 tab
  }
})
