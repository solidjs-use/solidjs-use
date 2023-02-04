---
category: Sensors
---

# useNavigatorLanguage

Reactive [navigator.language](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language).

## Usage

```jsx
import { on, createEffect } from 'solid-js'
import { useNavigatorLanguage } from 'solidjs-use'

const Demo = () => {
  const { language } = useNavigatorLanguage()

  createEffect(() => {
    // Listen to the value changing
    console.log(language())
  })

  return <div></div>
}
```
