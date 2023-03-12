import { join } from 'node:path'
import UnoCSS from 'unocss/vite'
import { defineConfig, mergeConfig } from 'vite'
import { prismjsPlugin } from 'vite-plugin-prismjs'
import solidPlugin from 'vite-plugin-solid'
// import devtools from 'solid-devtools/vite'
import vueConfig from '../../vite.config.mjs'
import Markdown from './vite-plugins/markdown-to-solidjs/index'
import { MarkdownTransform } from './vite-plugins/markdown-transform/index'
import watchAllMarkdown from './vite-plugins/watch-all-markdown'

export default defineConfig(
  mergeConfig(
    vueConfig,
    defineConfig({
      base: '/solidjs-use',
      plugins: [
        MarkdownTransform(),
        Markdown({}),
        solidPlugin({
          extensions: ['.mdx', '.md']
        }),
        prismjsPlugin({
          languages: ['bash', 'js', 'tsx', 'html', 'css'],
          plugins: ['copy-to-clipboard', 'line-highlight'],
          css: false,
          theme: 'prism-night-owl'
        }),
        UnoCSS(),
        watchAllMarkdown()
        // devtools()
      ],
      optimizeDeps: {},
      resolve: {
        conditions: ['development', 'browser'],
        alias: {
          'solid-mdx': join(__dirname, 'node_modules/solid-mdx/dist/index.mjs'),
          '@icons': join(__dirname, 'src/icons'),
          '@components': join(__dirname, 'src/components')
        }
      },
      build: {
        target: 'esnext',
        emptyOutDir: true,
        rollupOptions: {
          external: [
            '@iconify/utils/lib/loader/fs',
            '@iconify/utils/lib/loader/install-pkg',
            '@iconify/utils/lib/loader/node-loader',
            '@iconify/utils/lib/loader/node-loaders'
          ]
        }
      }
    })
  )
)
