---
category: Sensors
---

# useMagicKeys

Reactive keys pressed state, with magical keys combination support.

<RequiresProxy />

## Usage

```js
import { useMagicKeys } from 'solidjs-use'

const { shift, space, a /* keys you want to monitor */ } = useMagicKeys()

createEffect(() => {
  if (space()) console.log('space has been pressed')
})

createEffect(() => {
  if (shift() && a()) console.log('Shift + A have been pressed')
})
```

Check out [all the possible keycodes](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values).

### Combinations

You can magically use combinations (shortcuts/hotkeys) by connecting keys with `+` or `_`.

```ts
import { useMagicKeys } from 'solidjs-use'

const keys = useMagicKeys()
const shiftCtrlA = keys['Shift+Ctrl+A']

createEffect(() => {
  if (shiftCtrlA()) {
    console.log('Shift + Ctrl + A have been pressed')
  }
})
```

```ts
import { useMagicKeys } from 'solidjs-use'

const { Ctrl_A_B, space, alt_s /* ... */ } = useMagicKeys()

createEffect(() => {
  if (Ctrl_A_B()) {
    console.log('Control+A+B have been pressed')
  }
})
```

You can also use `whenever` function to make it shorter

```ts
import { useMagicKeys, whenever } from 'solidjs-use'

const keys = useMagicKeys()

whenever(keys.shift_space, () => {
  console.log('Shift+Space have been pressed')
})
```

### Current Pressed keys

A special property `current` is provided to representing all the keys been pressed currently.

```ts
import { useMagicKeys } from 'solidjs-use'

const { current } = useMagicKeys()

console.log(current) // { 'control', 'a' }

whenever(
  () => current.has('a') && !current.has('b'),
  () => console.log('A is pressed but not B')
)
```

### Key Aliasing

```ts
import { useMagicKeys, whenever } from 'solidjs-use'

const { shift_cool } = useMagicKeys({
  aliasMap: {
    cool: 'space'
  }
})

whenever(shift_cool, () => console.log('Shift + Space have been pressed'))
```

By default, we have some [preconfigured alias for common practices](https://github.com/solidjs-use/solidjs-use/blob/main/packages/core/useMagicKeys/aliasMap.ts).

### Conditionally Disable

You might have some `<input />` elements in your apps, and you don't want to trigger the magic keys handling when users focused on those inputs. There is an example of using `useActiveElement` and `logicAnd` to do that.

```ts
import { useActiveElement, useMagicKeys, whenever } from 'solidjs-use'
import { logicAnd } from 'solidjs-use'

const activeElement = useActiveElement()
const notUsingInput = createMemo(() => activeElement()?.tagName !== 'INPUT' && activeElement()?.tagName !== 'TEXTAREA')

const { tab } = useMagicKeys()

whenever(logicAnd(tab, notUsingInput), () => {
  console.log('Tab has been pressed outside of inputs!')
})
```

### Custom Event Handler

```ts
import { useMagicKeys, whenever } from 'solidjs-use'

const { ctrl_s } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 's' && e.type === 'keydown') e.preventDefault()
  }
})

whenever(ctrl_s, () => console.log('Ctrl+S have been pressed'))
```
