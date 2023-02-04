import { join, resolve } from 'path'
import fs from 'fs-extra'
import { paramCase } from 'change-case'
import { functionNames, getFunction, getVueFunctionName, packages } from '../../../../meta'
import type { Plugin } from 'vite'

export function MarkdownTransform(): Plugin {
  return {
    name: 'solidjs-use-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!/\.md\b/.exec(id)) return null

      // linkify function names
      code = code.replace(new RegExp(`\`({${functionNames.join('|')}})\`(.)`, 'g'), (_, name, ending) => {
        if (ending === ']')
          // already a link
          return _
        const fn = getFunction(name)!
        return `[\`${fn.name}\`](${fn.docs}) `
      })

      // convert links to relative
      code = code.replace(/https?:\/\/solidjs-use\.github\.io\//g, '/')

      const [pkg, _, _name, i] = id.split('/').slice(-4)
      const name = functionNames.find(n => n.toLowerCase() === _name.toLowerCase()) ?? _name
      if (functionNames.includes(name) && i === 'index.md') {
        const frontmatterEnds = code.indexOf('---\n\n') + 4
        const firstSubheader = code.search(/\n## \w/)
        const sliceIndex = firstSubheader < 0 ? frontmatterEnds : firstSubheader

        const { footer, header } = await getFunctionMarkdown(pkg, name)

        code = code + footer
        if (header) code = code.slice(0, sliceIndex) + header + code.slice(sliceIndex)

        code = code.replace(/(# \w+?)\r?\n/, `$1\n\n<FunctionInfo fn="${name}"/>\n`)
      }
      const navData = getNavData(code)
      code += navData
      return code
    }
  }
}

const DIR_SRC = resolve(__dirname, '../../../')
const GITHUB_BLOB_URL = 'https://github.com/solidjs-use/solidjs-use/blob/main/packages'
const VUEUSE_WEBSITE = 'https://vueuse.org'

export async function getFunctionMarkdown(pkg: string, name: string) {
  const URL = `${GITHUB_BLOB_URL}/${pkg}/src/${name}`

  const dirname = join(DIR_SRC, pkg, 'src', name)
  const demoPath = ['demo.tsx', 'demo.client.tsx'].find(i => fs.existsSync(join(dirname, i)))
  const types = await getTypeDefinition(pkg, name)

  let typingSection = ''

  if (types) {
    const code = `\`\`\`typescript\n${types.trim()}\n\`\`\``
    typingSection =
      types.length > 1000
        ? `
## Type Declarations

<details>
<summary op50 italic>Show Type Declarations</summary>

${code}

</details>
`
        : `\n## Type Declarations\n\n${code}`
  }

  const vueName = getVueFunctionName(name)
  const links = [
    ['Source', `${URL}/index.ts`],
    demoPath ? ['Demo', `${URL}/${demoPath}`] : undefined,
    ['Docs', `${URL}/index.md`],
    vueName ? ['VueUse Docs', `${VUEUSE_WEBSITE}/${pkg}/${getVueFunctionName(name)}`] : undefined
  ]
    .filter(item => item)
    .map(i => `[${i![0]}](${i![1]})`)
    .join(' • ')

  const sourceSection = `## Source\n\n${links}\n`
  const demoSection = demoPath
    ? `
## Demo

import Demo from './${demoPath}';

<DemoContainer>
  <Demo />
</DemoContainer>
`
    : ''

  const packageNote = Object.values(packages).find(p => p.name === pkg)!.addon
    ? `Available in the [@solidjs-use/${pkg}](/solidjs-use/${pkg}/README) add-on.\n`
    : ''

  const footer = `${typingSection}\n\n${sourceSection}\n`

  const header = demoSection + packageNote

  return {
    footer,
    header
  }
}

export const DIR_PACKAGES = resolve(__dirname, '../../../../')
export async function getTypeDefinition(pkg: string, name: string): Promise<string | undefined> {
  const typingFilepath = join(DIR_PACKAGES, `packages/${pkg}/dist/${name}/index.d.ts`)

  if (!fs.existsSync(typingFilepath)) return

  let types = await fs.readFile(typingFilepath, 'utf-8')

  if (!types) return

  // clean up types
  types = types
    .replace(/import\(.*?\)\.;?/g, '')
    .replace(/import[\s\S]+?from ?["'][\s\S]+?["'];?/g, '')
    .replace(/import\s.*;/g, '')
    .replace(/export {.*};/g, '')

  return types
}

function getNavData(markdown: string) {
  const pattern = /^(#{2,4})\s(.*)$/gm
  const match = markdown.match(pattern)
  const res = match?.map(item => {
    const title = item.replace(/#+\s/, '')
    return {
      href: `#${paramCase(title.replace(/`/g, '').replace(/\*\*/g, ''))}`,
      label: title,
      indent: !item.startsWith('## ')
    }
  })
  return `<ContextualNav links={${JSON.stringify(res)}} />`
}
