import { join } from 'path'
import fs from 'fs-extra'
import fg from 'fast-glob'
import { pascalCase } from 'change-case'
import { metadata } from '../meta/categories'
import type { PackageIndexes } from '../meta/types'

export const DIR_ROOT = join(__dirname, '..')
export const DIR_SRC = join(__dirname, '../packages')

export async function update() {
  await Promise.all([updatePackageJSONVersion(metadata), updateImport(metadata), updateMarkdownDoc()])
  await fs.copy('./CONTRIBUTING.md', './packages/docs/src/pages/contributing.md')
  await fs.copy('./README.md', './packages/core/README.md')
}

export async function updateImport({ packages, functions }: PackageIndexes) {
  for await (const { name, dir, manualImport } of Object.values(packages)) {
    if (manualImport) continue

    let imports: string[]
    if (name === 'components') {
      imports = functions
        .sort((a, b) => a.name.localeCompare(b.name))
        .flatMap(fn => {
          const arr: string[] = []

          // don't include integration components
          if (fn.package === 'integrations') return arr

          if (fn.component) arr.push(`export * from '../${fn.package}/${fn.name}/component'`)
          if (fn.directive) arr.push(`export * from '../${fn.package}/${fn.name}/directive'`)
          return arr
        })
    } else {
      imports = functions
        .filter(i => i.package === name)
        .map(f => f.name)
        .sort()
        .map(name => `export * from './${name}'`)
    }

    if (name === 'core') {
      imports.push("export * from './types'", "export * from '@solidjs-use/shared'", "export * from './ssr-handlers'")
    }

    await fs.writeFile(join(dir, 'index.ts'), `${imports.join('\n')}\n`)

    // temporary file for export-size
    await fs.remove(join(dir, 'index.mjs'))
  }
}

export async function updateMarkdownDoc() {
  const { packages } = metadata
  const packagesDir = Object.values(packages)
    .filter(item => !item.manualImport)
    .map(item => [`${item.name}/src/**/index.md`, `${item.name}/README.md`])
    .flat()

  // entries: ['core/README.md', 'core/src/useStorage/index.md']
  const entries = fg.sync(packagesDir, { cwd: join(__dirname, '../packages'), onlyFiles: true })

  // const CoreReadMe = lazy(() => import('../../../core/README.md'))
  // const UseTitle = lazy(() => import('../../../core/src/useTitle/index.md'))
  // Route path="/core/useTitle" element={<UseTitle components={markdownComponents} />} />
  function genComponentsPage() {
    const componentsPagePath = join(__dirname, '../packages/docs/src/pages/components-page.tsx')
    const componentsTmp = entries.map(filePath => {
      const pathArr = filePath.split('/')
      const varName = pascalCase(filePath.endsWith('README.md') ? `${pathArr[0]}ReadMe` : pathArr[2])
      const routePath = filePath.replace('/index.md', '').replace('src/', '').replace('.md', '')
      return {
        lazyImport: `const ${varName} = lazy(() => import('../../../${filePath}'))`,
        route: `      <Route path="/${routePath}" element={<${varName} components={markdownComponents} />} />`
      }
    })

    const lazyImports = componentsTmp.map(item => item.lazyImport).join('\n')
    const routes = componentsTmp.map(item => item.route).join('\n')

    const componentsPageTemp = `import markdownComponents from '../components/markdownComponents'
import { Route } from 'solid-app-router'
import { lazy } from 'solid-js'

${lazyImports}

const ComponentsPage = () => {
  return (
    <>${routes}
    </>
  )
}

export default ComponentsPage
`

    fs.writeFileSync(componentsPagePath, componentsPageTemp, 'utf-8')
  }

  genComponentsPage()
}

export async function updatePackageJSONVersion({ packages }: PackageIndexes) {
  const { version } = await fs.readJSON(join(DIR_ROOT, 'package.json'))
  for await (const { name } of Object.values(packages)) {
    const packageDir = join(DIR_SRC, name)
    const packageJSONPath = join(packageDir, 'package.json')
    const packageJSON = await fs.readJSON(packageJSONPath)

    packageJSON.version = version
    await fs.writeJSON(packageJSONPath, packageJSON, { spaces: 2 })
  }
}
