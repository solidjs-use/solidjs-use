---
category: Browser
---

# useTextareaAutoSize

Automatically update the height of a textarea depending on the content.

## Usage

```jsx
import { useTextareaAutoSize } from 'solidjs-use'

const Demo = () => {
  const { setTextareaRef, value, onChange } = useTextareaAutoSize()
  return (
    <div>
      <span>Type, the textarea will grow:</span>
      <textarea
        ref={setTextareaRef}
        value={value()}
        onChange={onChange}
        class="resize-none"
        placeholder="What's on your mind?"
      />
    </div>
  )
}
```
