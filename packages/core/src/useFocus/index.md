---
category: Sensors
---

# useFocus

Reactive utility to track or set the focus state of a DOM element. State changes to reflect whether the target element is the focused element. Setting reactive value from the outside will trigger `focus` and `blur` events for `true` and `false` values respectively.

## Basic Usage

```tsx
import { createEffect, createSignal } from 'solid-js'
import { useFocus } from 'solidjs-use'

const Demo = () => {
  const [target, setTarget] = createSignal<HTMLElement>()
  const [focused, setFocused] = useFocus(target)

  createEffect(() => {
    if (focused()) {
      console.log('input element has been focused')
    } else {
      console.log('input element has lost focus')
    }
  })
}
```

## Setting initial focus

To focus the element on its first render one can provide the `initialValue` option as `true`. This will trigger a `focus` event on the target element.

```tsx
import { useFocus } from 'solidjs-use';

const Demo = () => {
  const [target, setTarget] = createSignal<HTMLElement>()
  const [focused, setFocused] = useFocus(target， { initialValue: true })
}
```

## Change focus state

Changes of the `focused` reactive ref will automatically trigger `focus` and `blur` events for `true` and `false` values respectively. You can utilize this behavior to focus the target element as a result of another action (e.g. when a button click as shown below).

```tsx
import { createEffect, on, createSignal } from 'solid-js'
import { useFocus } from 'solidjs-use'

const Demo = () => {
  const [target, setTarget] = createSignal<HTMLElement>()
  const [focused, setFocused] = useFocus(target)

  return (
    <div>
      <button type="button" onClick={() => setFocused(true)}>
        Click me to focus input below
      </button>
      <input ref={setTarget} type="text" />
    </div>
  )
}
```
