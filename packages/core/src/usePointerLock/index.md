---
category: Sensors
---

# usePointerLock

Reactive [pointer lock](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API).

## Basic Usage

```js
import { usePointerLock } from 'solidjs-use'

const { isSupported, lock, unlock, element, triggerElement } = usePointerLock()
```
