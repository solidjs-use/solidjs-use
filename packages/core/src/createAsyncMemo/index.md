---
category: Reactivity
alias: asyncMemo
---

# createAsyncMemo

Memo for async functions

## Usage

```js
import { createSignal } from 'solid-js'
import { createAsyncMemo } from 'solidjs-use'

const [name, setName] = createSignal('jack')

const userInfo = createAsyncMemo(
  async () => {
    return await mockLookUp(name())
  },
  null // initial state
)
```

### Evaluation State

You will need to pass a Signal to track if the async function is evaluating.

```js
import { createSignal } from 'solid-js'
import { createAsyncMemo } from 'solidjs-use'

const evaluating = createSignal(false)

const userInfo = createAsyncMemo(
  async () => {
    /* your logic */
  },
  null,
  evaluating
)
```

### onCancel

When the memo source changed before the previous async function gets resolved, you may want to cancel the previous one. Here is an example showing how to incorporate with the fetch API.

```js
const [packageName] = createSignal('solidjs-use')

const downloads = createAsyncMemo(async onCancel => {
  const abortController = new AbortController()

  onCancel(() => abortController.abort())

  return await fetch(`https://api.npmjs.org/downloads/point/last-week/${packageName()}`, {
    signal: abortController.signal
  })
    .then(response => (response.ok ? response.json() : { downloads: '—' }))
    .then(result => result.downloads)
}, 0)
```
