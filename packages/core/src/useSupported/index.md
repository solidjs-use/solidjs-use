---
category: Utilities
---

# useSupported

SSR compatibility `isSupported`

## Usage

```ts
import { useSupported } from 'solidjs-use'

const isSupported = useSupported(() => navigator && 'getBattery' in navigator)

if (isSupported()) {
  // do something
  navigator.getBattery
}
```
