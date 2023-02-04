import { join, relative, resolve } from 'path'
import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import Git from 'simple-git'
import { packages } from '../meta/packages'
import type { PackageIndexes, SolidJSUseFunction, SolidJSUsePackage } from '../meta/types'

const DOCS_URL = 'https://solidjs-use.github.io/solidjs-use'
const DIR_ROOT = resolve(__dirname, '../')
const DIR_SRC = resolve(DIR_ROOT, 'packages')

const git = Git(DIR_ROOT)

async function listFunctions(dir: string, ignore: string[] = []) {
  const files = await fg('*', {
    onlyDirectories: true,
    cwd: dir,
    ignore: ['_*', 'dist', 'node_modules', ...ignore]
  })
  files.sort()
  return files
}

async function readMetadata() {
  const indexes: PackageIndexes = {
    packages: {},
    categories: [],
    functions: []
  }

  for await (const info of packages) {
    if (info.utils) continue

    const dir = join(DIR_SRC, info.name, 'src')

    const functions = await listFunctions(dir)

    const pkg: SolidJSUsePackage = {
      ...info,
      dir: relative(DIR_ROOT, dir).replace(/\\/g, '/'),
      docs: info.addon ? `${DOCS_URL}/${info.name}/README.html` : undefined
    }

    indexes.packages[info.name] = pkg

    await Promise.all(
      functions.map(async fnName => {
        const mdPath = join(dir, fnName, 'index.md')
        const tsPath = join(dir, fnName, 'index.ts')

        const fn: SolidJSUseFunction = {
          name: fnName,
          package: pkg.name,
          lastUpdated: +(await git.raw(['log', '-1', '--format=%at', tsPath])) * 1000
        }

        if (fs.existsSync(join(dir, fnName, 'component.ts'))) fn.component = true
        if (fs.existsSync(join(dir, fnName, 'directive.ts'))) fn.directive = true

        if (!fs.existsSync(mdPath)) {
          fn.internal = true
          indexes.functions.push(fn)
          return
        }

        fn.docs = `${DOCS_URL}/${pkg.name}/${fnName}/`

        const mdRaw = await fs.readFile(mdPath, 'utf-8')

        const { content: md, data: frontmatter } = matter(mdRaw)
        const category = frontmatter.category

        let alias = frontmatter.alias
        if (typeof alias === 'string')
          alias = alias
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
        let related = frontmatter.related
        if (typeof related === 'string')
          related = related
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
        else if (Array.isArray(related)) related = related.map(s => s.trim()).filter(Boolean)

        let description = (/# \w+[\s\n]+(.+?)(?:, |\. |\n|\.\n)/m.exec(md.replace(/\r\n/g, '\n')) ?? [])[1] || ''

        description = description.trim()
        description = description.charAt(0).toLowerCase() + description.slice(1)

        fn.category = ['core', 'shared'].includes(pkg.name) ? category : `@${pkg.display}`
        fn.description = description

        if (description.includes('DEPRECATED') || frontmatter.deprecated) fn.deprecated = true

        if (alias?.length) fn.alias = alias

        if (related?.length) fn.related = related

        if (pkg.submodules) fn.importPath = `${pkg.name}/${fn.name}`

        indexes.functions.push(fn)
      })
    )
  }

  indexes.functions.sort((a, b) => a.name.localeCompare(b.name))
  indexes.categories = getCategories(indexes.functions)

  // interop related
  indexes.functions.forEach(fn => {
    if (!fn.related) return

    fn.related.forEach(name => {
      const target = indexes.functions.find(f => f.name === name)
      if (!target) throw new Error(`Unknown related function: ${name}`)
      if (!target.related) target.related = []
      if (!target.related.includes(fn.name)) target.related.push(fn.name)
    })
  })
  indexes.functions.forEach(fn => fn.related?.sort())

  return indexes
}

function getCategories(functions: SolidJSUseFunction[]): string[] {
  return uniq(
    functions
      .filter(i => !i.internal)
      .map(i => i.category)
      .filter(Boolean)
  ).sort((a, b) =>
    a.startsWith('@') && !b.startsWith('@') ? 1 : b.startsWith('@') && !a.startsWith('@') ? -1 : a.localeCompare(b)
  )
}

function uniq<T extends any[]>(a: T) {
  return Array.from(new Set(a))
}

export async function genMetadata() {
  const indexes = await readMetadata()
  await fs.writeJSON(join(DIR_ROOT, '/meta/index.json'), indexes, { spaces: 2 })
}
