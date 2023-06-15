---
category: '@Integrations'
---

# useSortable

Wrapper for [`sortable`](https://github.com/SortableJS/Sortable).

For more information on what options can be passed, see [`Sortable.options`](https://github.com/SortableJS/Sortable#options) in the `Sortable` documentation.

## Install

```bash
npm i solidjs-use @solidjs-use/integrations sortablejs
```

## Usage

### Use ref

```tsx
import { useSortable } from '@solidjs-use/integrations/useSortable'
import { createSignal, For } from 'solid-js'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement | null>(null)
  const [list, setList] = createSignal([
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 3, name: 'c' }
  ])

  useSortable(el, [list, setList], {
    animation: 150
  })
  return (
    <>
      <div ref={setEl}>
        <For each={list()}>{item => <div>{item.name}</div>}</For>
      </div>
      <div class="text-center">{JSON.stringify(list())}</div>
    </>
  )
}
```

### Use specifies the selector to operate on

```tsx
import { useSortable } from '@solidjs-use/integrations/useSortable'
import { createSignal, For } from 'solid-js'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement | null>(null)
  const [list, setList] = createSignal([
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 3, name: 'c' }
  ])

  const animation = 200

  const { option } = useSortable(el, list, {
    handle: '.handle',
    // or option set
    // animation
  })

  // You can use the option method to set and get the option of Sortable
  option('animation', animation)
  // option('animation') // 200

  return (
    <>
      <div ref={setEl}>
        <For each={list()}>
          {item => (
            <div>
              <span>{item.name}</span>
              <span class="handle">*</span>
            </div>
          )}
        </For>
      </div>
    </>
  )
}
```

### Use a selector to get the root element

```tsx
import { useSortable } from '@solidjs-use/integrations/useSortable'
import { createSignal, For } from 'solid-js'

const Demo = () => {
  const [list, setList] = createSignal([
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 3, name: 'c' }
  ])

  useSortable('#dv', [list, setList])
  return (
    <>
      <div id="dv">
        <For each={list()}>
          {item => (
            <div>
              <span>{item.name}</span>
            </div>
          )}
        </For>
      </div>
    </>
  )
}
```

### Tips

If you want to handle the onUpdate yourself, you can pass in onUpdate parameters, and we also exposed a function to move the item position.

```ts
import { moveArrayElement } from '@solidjs-use/integrations/useSortable'

useSortable(el, [list, setList], {
  onUpdate: e => {
    // do something
    moveArrayElement([list, setList], e.oldIndex, e.newIndex)
    // nextTick required here as moveArrayElement is executed in a microtask
    // so we need to wait until the next tick until that is finished.
    nextTick(() => {
      /* do something */
    })
  }
})
```
