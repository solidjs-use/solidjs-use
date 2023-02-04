---
category: Browser
related:
  - useDark
  - usePreferredDark
  - useStorage
---

# useColorMode

Reactive color mode (dark / light / customs) with auto data persistence.

## Basic Usage

```js
import { useColorMode } from 'solidjs-use'

const [mode, setMode] = useColorMode() // Signal<'dark' | 'light'>
```

By default, it will match with users' browser preference using `usePreferredDark` (a.k.a `auto` mode). When reading the ref, it will by default return the current color mode (`dark`, `light` or your custom modes). The `auto` mode can be included in the returned modes by enabling the `emitAuto` option. When writing to the ref, it will trigger DOM updates and persist the color mode to local storage (or your custom storage). You can pass `auto` to set back to auto mode.

```ts
mode() // 'dark' | 'light'

setMode('dark') // change to dark mode and persist

setMode('auto') // change to auto mode
```

## Config

```js
import { useColorMode } from 'solidjs-use'

const [mode, setMode] = useColorMode({
  attribute: 'theme',
  modes: {
    // custom colors
    dim: 'dim',
    cafe: 'cafe'
  }
}) // Signal<'dark' | 'light' | 'dim' | 'cafe'>
```
