---
category: Browser
---

# useCssVar

Manipulate CSS variables

## Usage

```js
import { createSignal } from 'solid-js'
import { useCssVar } from 'solidjs-use'

const [el, setEl] = createSignal()
const color = useCssVar('--color', el)

const [elv, setElv] = createSignal(null)
const [key, setKey] = createSignal('--color')
const colorVal = useCssVar(key, elv)

const [someEl, setSomeEl] = createSignal(null)
const color = useCssVar('--color', someEl, { initialValue: '#eee' })
```
