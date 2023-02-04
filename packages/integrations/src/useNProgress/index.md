---
category: '@Integrations'
---

# useNProgress

Reactive wrapper for [`nprogress`](https://github.com/rstacruz/nprogress).

## Install

```bash
npm i solidjs-use @solidjs-use/integrations nprogress
```

## Usage

```js {6}
import { useNProgress } from '@solidjs-use/integrations/useNProgress'

const { isLoading, setIsLoading } = useNProgress()

function toggle() {
  setIsLoading(!isLoading())
}
```

### Passing a progress percentage

You can pass a percentage to indicate where the bar should start from.

```js {3}
import { useNProgress } from '@solidjs-use/integrations/useNProgress'

const { progress } = useNProgress(0.5)

function done() {
  setProgress(1.0)
}
```

> To change the progress percentage, set `setProgress(n)`, where n is a number between 0.1.

### Customization

Just edit [nprogress.css](http://ricostacruz.com/nprogress/nprogress.css) to your liking. Tip: you probably only want to find and replace occurrences of #29d.

You can [configure](https://github.com/rstacruz/nprogress#configuration) it by passing an object as a second parameter.

```js {4}
import { useNProgress } from '@solidjs-use/integrations/useNProgress'

useNProgress(null, {
  minimum: 0.1
  // ...
})
```
