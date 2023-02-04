# Configurations

These show the general configurations for most of the functions in solidjs-use.

### Event Filters

we provide the Event Filters system to give the flexibility to control when events will get triggered. For example, you can use `throttleFilter` and `debounceFilter` to control the event trigger rate:

```ts
import { debounceFilter, throttleFilter, useLocalStorage, useMouse } from 'solidjs-use'

// changes will write to localStorage with a throttled 1s
const storage = useLocalStorage('my-key', { foo: 'bar' }, { eventFilter: throttleFilter(1000) })

// mouse position will be updated after mouse idle for 100ms
const { x, y } = useMouse({ eventFilter: debounceFilter(100) })
```

Moreover, you can utilize `pausableFilter` to temporarily pause some events.

```ts
import { pausableFilter, useDeviceMotion } from 'solidjs-use'

const motionControl = pausableFilter()

const motion = useDeviceMotion({ eventFilter: motionControl.eventFilter })

motionControl.pause()

// motion updates paused

motionControl.resume()

// motion updates resumed
```

### Configurable Global Dependencies

functions that access the browser APIs will provide an option fields for you to specify the global dependencies (e.g. `window`, `document` and `navigator`). It will use the global instance by default, so for most of the time, you don't need to worry about it. This configure is useful when working with iframes and testing environments.

```ts
// accessing parent context
const parentMousePos = useMouse({ window: window.parent })

const iframe = document.querySelect('#my-iframe')

// accessing child context
const childMousePos = useMouse({ window: iframe.contentWindow })
```

```ts
// testing
const mockWindow = {
  /* ... */
}

const { x, y } = useMouse({ window: mockWindow })
```
