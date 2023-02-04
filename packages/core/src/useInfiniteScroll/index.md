---
category: Sensors
---

# useInfiniteScroll

Infinite scrolling of the element.

## Usage

```tsx
import { useInfiniteScroll } from 'solidjs-use'
import { createSignal, For } from 'solid-js'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement>()
  const [data, setData] = createSignal([1, 2, 3, 4, 5, 6])

  useInfiniteScroll(
    el,
    () => {
      const length = data().length + 1
      setData(data => [...data, ...Array.from({ length: 5 }, (_, i) => length + i)])
    },
    { distance: 10 }
  )
  return <div ref={setEl}>{<For each={data()}>{item => <div>{item}</div>}</For>}</div>
}
```
