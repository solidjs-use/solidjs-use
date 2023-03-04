import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config = defineConfig({
  plugins: [solidPlugin()],
  resolve: {
    conditions: ['development', 'browser'],
    alias: {
      'solidjs-use': resolve(__dirname, 'packages/core/src/'),
      '@solidjs-use/math': resolve(__dirname, 'packages/math/src/'),
      '@solidjs-use/rxjs': resolve(__dirname, 'packages/rxjs/src/'),
      '@solidjs-use/test-utils': resolve(__dirname, 'packages/.test/'),
      '@solidjs-use/shared': resolve(__dirname, 'packages/shared/src/'),
      '@solidjs-use/components': resolve(__dirname, 'packages/components/src/'),
      '@solidjs-use/integrations': resolve(__dirname, 'packages/integrations/src'),
      '@solidjs-use/solid-to-vue': resolve(__dirname, 'packages/solid-to-vue/src/'),
      '@solidjs-use/docs-utils': resolve(__dirname, 'packages/docs/src/utils/index.ts'),
      '@solidjs-use/docs-components': resolve(__dirname, 'packages/docs/src/components/')
    },
    dedupe: ['solid-js']
  },
  server: {
    fs: {
      strict: false
    }
  }
})

export default config
