---
category: '@Integrations'
---

# useDrauu

Reactive instance for [drauu](https://github.com/antfu/drauu).

## Install

```bash
npm i solidjs-use @solidjs-use/integrations drauu
```

## Usage

```jsx
import { createSignal } from 'solid-js'
import { useDrauu } from '@solidjs-use/integrations/useDrauu'

const Demo = () => {
  const [target, setTarget] = createSignal()
  const { undo, redo, canUndo, canRedo, brush } = useDrauu(target)

  return (
    <div>
      <svg ref={setTarget}>...</svg>
    </div>
  )
}
```
