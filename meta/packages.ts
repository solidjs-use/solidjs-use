import type { PackageManifest } from './types'

export const packages: PackageManifest[] = [
  {
    name: 'solid-to-vue',
    display: 'SolidJS API to Vue API',
    manualImport: true
  },
  {
    name: 'shared',
    display: 'Shared utilities',
    external: ['@solidjs-use/solid-to-vue']
  },
  {
    name: 'core',
    pkgName: 'solidjs-use',
    display: 'solidjs-use',
    description: 'Collection of essential SolidJs Composition Utilities',
    external: ['@solidjs-use/shared', '@solidjs-use/shared/solid-to-vue']
  },
  {
    name: 'math',
    display: 'Math',
    description: 'Math functions for VueUse',
    external: ['solidjs-use', 'solidjs-use/solid-to-vue']
  },
  {
    name: 'integrations',
    display: 'Integrations',
    description: 'Integration wrappers for utility libraries',
    addon: true,
    submodules: true,
    external: [
      'axios',
      'universal-cookie',
      'qrcode',
      'http',
      'nprogress',
      'jwt-decode',
      'focus-trap',
      'change-case',
      'drauu',
      'fuse.js',
      'async-validator',
      'idb-keyval',
      'sortablejs',
      'solidjs-use',
      'solidjs-use/solid-to-vue'
    ],
    globals: {
      axios: 'axios',
      'universal-cookie': 'UniversalCookie',
      qrcode: 'QRCode',
      nprogress: 'nprogress',
      'jwt-decode': 'jwt_decode',
      'focus-trap': 'focusTrap',
      drauu: 'Drauu',
      'fuse.js': 'Fuse',
      'change-case': 'changeCase',
      'async-validator': 'AsyncValidator',
      'idb-keyval': 'idbKeyval',
      sortablejs: 'Sortable'
    }
  },
  {
    name: 'firebase',
    display: 'Firebase',
    description: 'Enables realtime bindings for Firebase',
    addon: true,
    submodules: true,
    external: [
      'firebase',
      'firebase/app',
      'firebase/database',
      'firebase/firestore',
      'solidjs-use',
      'solidjs-use/solid-to-vue'
    ],
    globals: {
      firebase: 'firebase',
      'firebase/app': 'firebase',
      'firebase/database': 'firebase',
      'firebase/firestore': 'firebase'
    }
  },
  {
    name: 'rxjs',
    display: 'RxJS',
    description: 'Enables RxJS reactive functions in Vue',
    addon: true,
    external: ['rxjs', 'rxjs/operators', 'solidjs-use', 'solidjs-use/solid-to-vue'],
    globals: {
      rxjs: 'rxjs',
      'rxjs/operators': 'rxjs.operator'
    }
  },
  {
    name: 'electron',
    display: 'Electron',
    description: 'Electron renderer process modules for VueUse',
    author: 'Archer Gu<https://github.com/ArcherGu>',
    addon: true,
    external: ['electron', 'solidjs-use', 'solidjs-use/solid-to-vue'],
    iife: false
  }
]
