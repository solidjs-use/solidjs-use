---
category: Elements
---

# useDropZone

Create an zone where files can be dropped.

## Usage

```tsx
import { useDropZone } from 'solidjs-use'

const Demo = () => {
  const [dropZoneRef, setDropZoneRef] = createSignal<HTMLDivElement>()

  function onDrop(files: File[] | null) {
    // called when files are dropped on zone
  }

  return <div ref={setDropZoneRef}>Drop files here</div>
}
```
