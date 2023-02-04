---
category: Elements
---

# useResizeObserver

Reports changes to the dimensions of an Element's content or the border-box

## Usage

```tsx
import { Note } from '@solidjs-use/docs-components'
import { createSignal } from 'solid-js'
import { useResizeObserver } from 'soliduse-js'

const Demo = () => {
  const [el, setEl] = createSignal(null)
  const [text, setText] = createSignal('')

  useResizeObserver(el, entries => {
    const [entry] = entries
    const { width, height } = entry.contentRect
    setText(`width: ${width}\nheight: ${height}`)
  })
  return <div ref={setEl}>{text()}</div>
}

export default Demo
```

[ResizeObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
