import { execSync } from 'node:child_process'
import path from 'node:path'
import fs from 'fs-extra'
import { consola } from 'consola'
import { version } from '../package.json'
import { packages } from '../meta/packages'

let command = 'npm publish --access public --registry https://registry.npmjs.org/'

if (version.includes('beta')) command += ' --tag beta'

for (const { name, pkgName, submodules } of packages) {
  const packageDir = path.join(__dirname, `../packages/${name}`)
  const packageJSON = fs.readFileSync(path.join(packageDir, 'package.json'), 'utf-8').replaceAll('workspace:*', version)
  fs.writeFileSync(path.join(packageDir, 'package.json'), packageJSON, 'utf-8')
  const distDir = path.join(packageDir, 'dist')
  if (submodules) {
    const readme = fs.readFileSync(path.join(packageDir, 'README.md'))
    fs.writeFileSync(path.join(distDir, 'README.md'), readme, 'utf-8')
    fs.writeFileSync(path.join(distDir, 'package.json'), packageJSON.replaceAll('/dist', ''), 'utf-8')
  }

  execSync(command, { stdio: 'inherit', cwd: submodules ? distDir : packageDir })
  consola.success(`Published ${pkgName ?? `@solidjs-use/${name}`}`)
}
