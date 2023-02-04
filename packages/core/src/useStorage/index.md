---
category: State
related: useLocalStorage, useSessionStorage, useStorageAsync
---

# useStorage

Reactive [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)/[SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

## Usage

```js
import { useStorage } from 'solidjs-use'

// bind object
const [state, setData] = useStorage('my-store', { hello: 'hi', greeting: 'Hello' })

// bind boolean
const [flag, setFlag] = useStorage('my-flag', true) // returns Signal<boolean>

// bind number
const [count, setCount] = useStorage('my-count', 0) // returns Signal<number>

// bind string with SessionStorage
const [id, setId] = useStorage('my-id', 'some-string-id', sessionStorage) // returns Signal<string>

// delete data from storage
setState(null)
```

## Merge Defaults

By default, `useStorage` will use the value from storage if it presents and ignores the default value. Be aware that when you adding more properties to the default value, the key might be undefined if client's storage does not have that key.

```ts
localStorage.setItem('my-store', '{"hello": "hello"}')

const [state] = useStorage('my-store', { hello: 'hi', greeting: 'hello' }, localStorage)

console.log(state().greeting) // undefined, since the value is not presented in storage
```

To solve that, you can enable `mergeDefaults` option.

```ts
localStorage.setItem('my-store', '{"hello": "nihao"}')

const [state] = useStorage(
  'my-store',
  { hello: 'hi', greeting: 'hello' },
  localStorage,
  { mergeDefaults: true } // <--
)

console.log(state().hello) // 'nihao', from storage
console.log(state().greeting) // 'hello', from merged default value
```

When setting it to true, it will perform a **shallow merge** for objects. You can pass a function to perform custom merge (e.g. deep merge), for example:

```ts
const [state] = useStorage(
  'my-store',
  { hello: 'hi', greeting: 'hello' },
  localStorage,
  { mergeDefaults: (storageValue, defaults) => deepMerge(defaults, storageValue) } // <--
)
```

## Custom Serialization

By default, `useStorage` will smartly use the corresponding serializer based on the data type of provided default value. For example, `JSON.stringify` / `JSON.parse` will be used for objects, `Number.toString` / `parseFloat` for numbers, etc.

You can also provide your own serialization function to `useStorage`:

```ts
import { useStorage } from 'solidjs-use'

useStorage('key', {}, undefined, {
  serializer: {
    read: (v: any) => (v ? JSON.parse(v) : null),
    write: (v: any) => JSON.stringify(v)
  }
})
```

Please note when you provide `null` as the default value, `useStorage` can't assume the data type from it. In this case, you can provide a custom serializer or reuse the built-in ones explicitly.

```ts
import { StorageSerializers, useStorage } from 'solidjs-use'

const [objectLike, setObjectLike] = useStorage('key', null, undefined, { serializer: StorageSerializers.object })
setObjectLike({ foo: 'bar' })
```
