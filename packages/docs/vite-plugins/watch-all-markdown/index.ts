import path from 'path'
import chokidar from 'chokidar'
import { packages } from '../../../../meta/packages'
import { genMetadata } from '../../../../scripts/gen-metadata-fn'
import { updateMarkdownDoc } from '../../../../scripts/update-fn'
import type { Plugin } from 'vite'

function debounce(fn: () => void, wait: number) {
  let timer: NodeJS.Timeout | null = null
  return function () {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, wait)
  }
}

function watchAllMarkdown(): Plugin {
  const packagesDir = packages.map(item => `${item.name}/src/**/index.md`).flat()
  const watcher = chokidar.watch(packagesDir, {
    ignoreInitial: true,
    persistent: true,
    interval: 500,
    cwd: path.join(__dirname, '../../../../packages')
  })
  async function update() {
    await genMetadata()
    await updateMarkdownDoc()
  }
  return {
    name: 'vite-plugin-solid-markdown',
    buildStart() {
      watcher
        .on('add', debounce(update, 1000))
        .on('unlink', debounce(update, 1000))
        .on('error', error => console.error(`watch-all-markdown error: ${error}`))
    },
    buildEnd() {
      watcher.close()
    }
  }
}

export default watchAllMarkdown
