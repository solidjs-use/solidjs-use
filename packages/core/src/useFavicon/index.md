---
category: Browser
---

# useFavicon

Reactive favicon

## Usage

```js {3}
import { useFavicon } from 'solidjs-use'

const [icon, setIcon] = useFavicon()

setIcon('dark.png') // change current icon
```

### Passing a source Accessor or Signal

You can pass a `Accessor` to it, changes from of the source Accessor will be reflected to your favicon automatically.

```js {7}
import { createMemo, createSignal } from 'solid-js'
import { useFavicon, usePreferredDark } from 'solidjs-use'

const isDark = usePreferredDark()
const favicon = createMemo(() => (isDark() ? 'dark.png' : 'light.png'))

useFavicon(favicon)
```

When a source `Signal` is passed, the return will be a `Signal`.

```ts
const [source, setSource] = createSignal('icon.png')
const [icon, setIcon] = useFavicon([source, setSource]) // Signal
```
