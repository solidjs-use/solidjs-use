# Guidelines

Here are the guidelines for solidjs-use functions. You could also take them as a reference for authoring your own composable functions or apps.

## General

- Use options object as arguments whenever possible to be more flexible for future extensions.
- Use `configurableWindow` (etc.) when using global variables like `window` to be flexible when working with multi-windows, testing mocks, and SSR.
- When involved with Web APIs that are not yet implemented by the browser widely, also outputs `isSupported` flag
- Avoid using console logs
- When the function is asynchronous, return a PromiseLike

Read also: [Best Practice](/solidjs-use/best-practice)

## Configurable Globals

When using global variables like `window` or `document`, support `configurableWindow` or `configurableDocument` in the options interface to make the function flexible when for scenarios like multi-windows, testing mocks, and SSR.

Learn more about the implementation: [`_configurable.ts`](https://github.com/solidjs-use/solidjs-use/blob/main/packages/core/_configurable.ts)

```ts
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'

export function useActiveElement<T extends HTMLElement>(options: ConfigurableWindow = {}) {
  const {
    // defaultWindow = isClient ? window : undefined
    window = defaultWindow
  } = options

  let el: T

  // skip when in Node.js environment (SSR)
  if (window) {
    window.addEventListener(
      'blur',
      () => {
        el = window?.document.activeElement
      },
      true
    )
  }

  /* ... */
}
```

Usage example:

```ts
// in iframe and bind to the parent window
useActiveElement({ window: window.parent })
```

## Controls

We use the `controls` option allowing users to use functions with a single return for simple usages, while being able to have more controls and flexibility when needed.

#### When to provide a `controls` option

- The function is more commonly used with single `Accessor` or
- Examples: `useTimestamp`, `useInterval`,

```ts
// common usage
const timestamp = useTimestamp()

// more controls for flexibility
const { timestamp, pause, resume } = useTimestamp({ controls: true })
```

Refer to `useTimestamp`'s source code for the implementation of proper TypeScript support.

#### When **NOT** to provide a `controls` option

- The function is more commonly used with multiple returns
- Examples: `useRafFn`, `useHistoryTravel`,

```ts
const { pause, resume } = useRafFn(() => {})
```

## `isSupported` Flag

When involved with Web APIs that are not yet implemented by the browser widely, also outputs `isSupported` flag.

For example `useShare`:

```ts
export function useShare(shareOptions: MaybeAccessor<ShareOptions> = {}, options: ConfigurableNavigator = {}) {
  const { navigator = defaultNavigator } = options
  const isSupported = useSupported(() => navigator && 'canShare' in navigator)

  const share = async overrideOptions => {
    if (isSupported()) {
      /* ...implementation */
    }
  }

  return {
    isSupported,
    share
  }
}
```

## Asynchronous Composables

When a composable is asynchronous, like `useFetch`, it is a good idea to return a PromiseLike object from the composable
so the user is able to await the function.

- Use a `Accessor` to determine when the function should resolve e.g. `isFinished`
- Store the return state in a variable as it must be returned twice, once in the return and once in the promise.
- The return type should be an intersection between the return type and a PromiseLike, e.g. `UseFetchReturn & PromiseLike<UseFetchReturn>`

```ts
export function useFetch<T>(url: MaybeAccessor<string>): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>> {
  const [data, setData] = createSignal<T | undefined>()
  const [error, setError] = createSignal<Error | undefined>()
  const [isFinished, setIsFinished] = createSignal(false)

  fetch(unAccessor(url))
    .then(r => r.json())
    .then(r => setData(r))
    .catch(e => setError(e))
    .finally(() => setIsFinished(true))

  // Store the return state in a variable
  const state: UseFetchReturn<T> = {
    data,
    error,
    isFinished
  }

  return {
    ...state,
    // Adding `then` to an object allows it to be awaited.
    then(onFulfilled, onRejected) {
      return new Promise<UseFetchReturn<T>>((resolve, reject) => {
        until(isFinished)
          .toBeTruthy()
          .then(() => resolve(state))
          .then(() => reject(state))
      }).then(onFulfilled, onRejected)
    }
  }
}
```
