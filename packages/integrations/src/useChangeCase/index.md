---
category: '@Integrations'
---

# useChangeCase

Reactive wrapper for [`change-case`](https://github.com/blakeembrey/change-case).

## Install

```bash
npm i solidjs-use @solidjs-use/integrations change-case
```

## Usage

```ts
import { useChangeCase } from '@solidjs-use/integrations/useChangeCase'

// `changeCase` will be a memo
const changeCase = useChangeCase('hello world', 'camelCase')
changeCase() // helloWorld
setChangeCase('solidjs use')
changeCase() // solidjsUse
// Supported methods
// export {
//   camelCase,
//   capitalCase,
//   constantCase,
//   dotCase,
//   headerCase,
//   noCase,
//   paramCase,
//   pascalCase,
//   pathCase,
//   sentenceCase,
//   snakeCase,
// } from 'change-case'
```

or passing a `Accessor` to it, the returned `Accessor` will change along with the source Accessor's changes.

Can be passed into `options` for customization

```ts
import { useChangeCase } from '@solidjs-use/integrations/useChangeCase'
const [input, setInput] = createSignal('helloWorld')
const changeCase = useChangeCase(input, 'camelCase', {
  delimiter: '-'
})
changeCase() // hello-World
setInput('solidjs use')
changeCase() // solidjs-use
```
