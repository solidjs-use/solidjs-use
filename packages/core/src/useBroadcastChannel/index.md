---
category: Browser
---

# useBroadcastChannel

Reactive [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel).

Closes a broadcast channel automatically component unmounted.

## Usage

The BroadcastChannel interface represents a named channel that any browsing
context of a given origin can subscribe to. It allows communication between
different documents (in different windows, tabs, frames, or iframes) of the
same origin.

Messages are broadcasted via a message event fired at all BroadcastChannel
objects listening to the channel.

```tsx
import { useBroadcastChannel } from 'solidjs-use'
import { createEffect, createSignal } from 'solid-js'

const { isSupported, data, post, error, close } = useBroadcastChannel({ name: 'solidjs-use-demo-channel' })

const [message, setMessage] = createSignal('')

setMessage('Hello, solidjs-use World!')

// Post the message to the broadcast channel:
post(message())

// Option to close the channel if you wish:
close()
```
