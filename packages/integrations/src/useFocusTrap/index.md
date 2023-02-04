---
category: '@Integrations'
---

# useFocusTrap

Reactive wrapper for [`focus-trap`](https://github.com/focus-trap/focus-trap).

For more information on what options can be passed, see [`createOptions`](https://github.com/focus-trap/focus-trap#createfocustrapelement-createoptions) in the `focus-trap` documentation.

## Install

```bash
npm i solidjs-use @solidjs-use/integrations focus-trap
```

## Usage

**Basic Usage**

```jsx
import { createSignal } from 'solid-js'
import { useFocusTrap } from '@solidjs-use/integrations/useFocusTrap'

const Demo = () => {
  const [target, setTarget] = createSignal()
  const { hasFocus, activate, deactivate } = useFocusTrap(target)

  return (
    <div>
      <button onClick={() => activate()}>Activate</button>
      <div ref={setTarget}>
        <span>Has Focus: {hasFocus()}</span>
        <input type="text" />
        <button onClick={() => deactivate()}>Deactivate</button>
      </div>
    </div>
  )
}
```

**Automatically Focus**

```jsx
import { createSignal } from 'solid-js'
import { useFocusTrap } from '@solidjs-use/integrations/useFocusTrap'

const Demo = () => {
  const [target, setTarget] = createSignal()
  const { hasFocus, activate, deactivate } = useFocusTrap(target, { immediate: true })

  return (
    <div>
      <div ref={setTarget}>...</div>
    </div>
  )
}
```
