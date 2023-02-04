---
category: Browser
---

# useTextDirection

Reactive [dir](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) of the element's text.

## Usage

```ts
import { useTextDirection } from 'solidjs-use'

const { dir, setDir } = useTextDirection()
```

By default, it returns `rlt` direction when dir `rtl` is applied to the `html` tag, for example:

```html
<!--ltr-->
<html>
  ...
</html>

<!--rtl-->
<html dir="rtl">
  ...
</html>
```

## Options

```ts
import { useTextDirection } from 'solidjs-use'

const { dir, setDir } = useTextDirection({
  selector: 'body'
})
```
