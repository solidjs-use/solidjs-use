---
category: Browser
---

# useObjectUrl

Reactive URL representing an object.

Creates an URL for the provided `File`, `Blob`, or `MediaSource` via [URL.createObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) and automatically releases the URL via [URL.revokeObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL) when the source changes or the component is unmounted.

## Usage

### import

```js
import { useObjectUrl } from 'solidjs-use'
import { createSignal } from 'solid-js'
```

### useForBlob

```js
const [file, setFile] = createSignal < Blob > new Blob(['xxxx'], { type: 'plain/text' })
const objectUrl = useObjectUrl(file())
```

- also you can pass value directly

```js
const objectUrl = useObjectUrl(new Blob(['xxxx'], { type: 'plain/text' }))
```

### useForFile

```js
const [file, setFile] = createSignal < File > new File(['xxxx'], 'test.txt')
const objectUrl = useObjectUrl(file())
```

- also you can pass value directly

```js
const objectUrl = useObjectUrl(new File(['xxxx'], 'test.txt'))
```

### useForMediaSource

```js
const [file, setFile] = createSignal < File > new MediaSource()
const objectUrl = useObjectUrl(file())
```

- also you can pass value directly

```js
const objectUrl = useObjectUrl(new MediaSource())
```

### useForFileInput

```tsx
const Demo = () => {
  const [file, setFile] = createSignal<File | MediaSource | undefined>()
  const objectUrl = useObjectUrl(file)
  return (
    <div class="grid grid-cols-1 gap-x-4 gap-y-4">
      <div>
        <input
          type="file"
          onChange={event => {
            setFile(event.currentTarget.files?.[0])
          }}
        />
        <a href={objectUrl()}>Open file</a>
      </div>
    </div>
  )
}

export default Demo
```
