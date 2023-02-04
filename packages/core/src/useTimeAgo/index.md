---
category: Time
---

# useTimeAgo

Reactive time ago. Automatically update the time ago string when the time changes.

## Usage

```js
import { useTimeAgo } from 'solidjs-use'

const timeAgo = useTimeAgo(new Date(2021, 0, 1))
```

## Non-Reactivity Usage

In case you don't need the reactivity, you can use the `formatTimeAgo` function to get the formatted string instead of a Accessor.

```js
import { formatTimeAgo } from 'solidjs-use'

const timeAgo = formatTimeAgo(new Date(2021, 0, 1)) // string
```
