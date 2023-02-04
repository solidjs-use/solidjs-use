---
category: Component
---

# useVirtualList

Create virtual lists with ease. Virtual lists (sometimes called [_virtual scrollers_](https://akryum.github.io/vue-virtual-scroller/)) allow you to render a large number of items performantly. They only render the minimum number of DOM nodes necessary to show the items within the `container` element by using the `wrapper` element to emulate the container element's full height.

## Usage

### Simple list

```typescript
import { useVirtualList } from 'solidjs-use'

const { list, containerProps, wrapperProps } = useVirtualList(Array.from(Array(99999).keys()), {
  // Keep `itemHeight` in sync with the item's row.
  itemHeight: 22
})
```

### Config

| State      | Type     | Description                                                                                     |
| ---------- | -------- | ----------------------------------------------------------------------------------------------- |
| itemHeight | `number` | ensure that the total height of the `wrapper` element is calculated correctly.\*                |
| itemWidth  | `number` | ensure that the total width of the `wrapper` element is calculated correctly.\*                 |
| overscan   | `number` | number of pre-rendered DOM nodes. Prevents whitespace between items if you scroll very quickly. |

\* The `itemHeight` or `itemWidth` must be kept in sync with the height of each row rendered. If you are seeing extra whitespace or jitter when scrolling to the bottom of the list, ensure the `itemHeight` or `itemWidth` is the same height as the row.

### Reactive list

```tsx
import { useVirtualList, useToggle } from 'solidjs-use'

const [isEven, toggle] = useToggle()
const allItems = Array.from(Array(99999).keys())
const filteredList = createMemo(() => allItems.filter(i => (isEven() ? i % 2 === 0 : i % 2 === 1)))

const { list, containerProps, wrapperProps } = useVirtualList(filteredList, {
  itemHeight: 22
})
```

```tsx
<p>Showing { isEven() ? 'even' : 'odd' } items</p>
<button onClick={() => toggle()}>Toggle Even/Odd</button>
<div ref={containerProps.ref} style={containerProps.style} onScroll={containerProps.onScroll} style="height: 300px">
  <div style={wrapperProps().style}>
    <For each={list()}>
      {
        (item) => <div style="height: 22px">
          Row { item.data }
        </div>
      }
    </For>
  </div>
</div>
```

### Horizontal list

```typescript
import { useVirtualList } from 'solidjs-use'

const allItems = Array.from(Array(99999).keys())

const { list, containerProps, wrapperProps } = useVirtualList(allItems, {
  itemWidth: 200
})
```

```tsx
<div ref={containerProps.ref} style={containerProps.style} onScroll={containerProps.onScroll} style="height: 300px">
  <div style={wrapperProps().style}>
    <For each={list()}>{item => <div style="width: 200px">Row {item.data}</div>}</For>
  </div>
</div>
```

To scroll to a specific element, the component exposes `scrollTo(index: number) => void`.
