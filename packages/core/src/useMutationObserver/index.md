---
category: Elements
---

# useMutationObserver

Watch for changes being made to the DOM tree. [MutationObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

## Usage

```jsx
import { createSignal, For } from "solid-js";
import { useMutationObserver } from "solidjs-use";


const Demo = () => {
  const [el, setEl] = createSignal(null)
  const [messages, setMessage] = createSignal<string[]>([])

  useMutationObserver(
    el,
    (mutations) => {
      if (!mutations[0])
        return

      setMessage(state => [...state, mutations[0].attributeName])
    },
    { attributes: true },
  )

  return <div>
    <div ref={setEl}>
      <For each={messages()}>
        {
          (text) => <div>Mutation Attribute: {text}</div>
        }
      </For>
    </div>
  </div>
}
```
