---
category: Browser
---

# useStyleTag

Inject reactive `style` element in head.

## Usage

### Basic usage

Provide a CSS string, then `useStyleTag` will automatically generate an id and inject it in `<head>`.

```js
import { useStyleTag } from 'solidjs-use'

const {
  id,
  css,
  setCss
  load,
  unload,
  isLoaded,
} = useStyleTag('.foo { margin-top: 32px; }')

// Later you can modify styles
setCss('.foo { margin-top: 64px; }')
```

This code will be injected to `<head>`:

```html
<style type="text/css" id="solidjs-use_style_tag_1">
  .foo {
    margin-top: 64px;
  }
</style>
```

### Custom ID

If you need to define your own id, you can pass `id` as first argument.

```js
import { useStyleTag } from 'solidjs-use'

useStyleTag('.foo { margin-top: 32px; }', { id: 'custom-id' })
```

```html
<!-- injected to <head> -->
<style type="text/css" id="custom-id">
  .foo {
    margin-top: 32px;
  }
</style>
```

### Media query

You can pass media attributes as last argument within object.

```js
useStyleTag('.foo { margin-top: 32px; }', { media: 'print' })
```

```html
<!-- injected to <head> -->
<style type="text/css" id="solidjs-use_style_tag_1" media="print">
  .foo {
    margin-top: 32px;
  }
</style>
```
