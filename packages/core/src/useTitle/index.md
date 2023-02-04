---
category: Browser
---

# useTitle

Reactive document title.

## Usage

```js
import { useTitle } from 'solidjs-use'

const [title, setTitle] = useTitle()
console.log(title()) // print current title
setTitle('Hello') // change current title
```

Set initial title immediately:

```js
const [title, setTitle] = useTitle('New Title')
```

Pass a `Accessor` and the title will be updated when the source ref changes:

```js
import { useTitle } from 'solidjs-use'

const [messages, setMessage] = createSignal(0)

const title = createMemo(() => {
  return !messages() ? 'No message' : `${messages()} new messages`
})

useTitle(title) // document title will match with the Accessor "title"
```

Pass an optional template tag [Vue Meta Title Template](https://vue-meta.nuxtjs.org/guide/metainfo.html) to update the title to be injected into this template:

```js
const [title, setTitle] = useTitle('New Title', { titleTemplate: '%s | My Awesome Website' })
```

<Alert status="warning">
  <AlertIcon mr="$2_5" />
  `observe` is incompatible with `titleTemplate`.
</Alert>
