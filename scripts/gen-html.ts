import path from 'path'
import fg from 'fast-glob'
import fs from 'fs-extra'

const docsDist = path.join(__dirname, '../packages/docs/dist')
const indexHtmlPath = path.join(docsDist, '/index.html')

fg.sync(['*/**/index.md', '*/**/README.md'], {
  cwd: path.join(__dirname, '../packages'),
  onlyFiles: true,
  ignore: ['**/node_modules', '**/dist', 'docs', 'solid-to-vue']
})
  .map(item => item.replace('/src', '').replace('/index.md', '').replace('.md', ''))
  .forEach(item => {
    fs.createLink(indexHtmlPath, path.join(docsDist, `${item}.html`))
  })

fg.sync(['*.md', '*.tsx'], {
  cwd: path.join(__dirname, '../packages/docs/src/pages'),
  onlyFiles: true
})
  .map(item => item.replace('.md', '').replace('.tsx', ''))
  .forEach(item => {
    fs.createLink(indexHtmlPath, path.join(docsDist, `${item}.html`))
  })
