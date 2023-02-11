# Best Practice

### Side-effect Clean Up

solidjs-use's functions will clean up the side-effects automatically.

For example, `useEventListener` will call `removeEventListener` when the component is unmounted so you don't need to worry about it.

```ts
// will cleanup automatically
useEventListener('mousemove', () => {})
```

All solidjs-use functions follow this convention.

To manually dispose the side-effects, some function returns a stop handler. For example:

```ts
const stop = useEventListener('mousemove', () => {})

// ...

// unregister the event listener manually
stop()
```

### Passing `Accessor` or `Signal` as Argument

Most solidjs-use functions can accept both normal type and Accessor type.

Taking `useTitle` as an example:

#### Normal usage

Normally `useTitle` return a signal that reflects to the page's title. When you assign new value to the signal, it automatically updates the title.

```ts
const isDark = useDark()
const [title, setTitle] = useTitle('Set title')

createEffect(() => {
  setTitle(isDark() ? '🌙 Good evening!' : '☀️ Good morning!')
})
```

#### Connection usage

If you think in "connection", you can instead passing a Accessor that make it bind to the page's title.

```ts
const isDark = useDark()
const title = createMemo(() => (isDark() ? '🌙 Good evening!' : '☀️ Good morning!'))

useTitle(title)
```

#### Signal as Argument

```ts
const [title, setTitle] = createSignal('')

useTitle([title, setTitle])
```
