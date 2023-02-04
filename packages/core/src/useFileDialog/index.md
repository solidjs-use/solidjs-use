---
category: Browser
---

# useFileDialog

Open file dialog with ease.

## Usage

```ts
import { useFileDialog } from 'solidjs-use'

const { files, open, reset } = useFileDialog()
```

```tsx
<button type="button" onClick={open}>
  Choose file
</button>
```
