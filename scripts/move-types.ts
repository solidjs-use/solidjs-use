import fs from 'fs-extra'
import { packages } from '../meta/packages'

packages.slice(1).forEach(pkg => {
  fs.copy(`dist/packages/${pkg.name}/src`, `packages/${pkg.name}/dist`, { recursive: true, overwrite: false })
})
