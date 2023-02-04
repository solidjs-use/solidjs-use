---
category: Reactivity
alias: autoResetRef
---

# signalAutoReset

A ref which will be reset to the default value after some time.

## Usage

```ts
import { signalAutoReset } from 'solidjs-use'

const message = signalAutoReset('default message', 1000)

const setMessage = () => {
  // here the value will change to 'message has set' but after 1000ms, it will change to 'default message'
  setMessage('message has set')
}
```
