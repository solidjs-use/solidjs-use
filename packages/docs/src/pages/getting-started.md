# Get Started

## Installation

```bash
npm i solidjs-use
```

[Add ons](/add-ons.html)

## Playground

[Playground](https://solidjs-use.github.io/solidjs-use-playground/)

## Demos

- [Vite + SolidJS + solidjs-use](https://github.com/solidjs-use/solidjs-use-vite-starter)

## Usage Example

Simply importing the functions you need from `solidjs-use`

```tsx
import { useMouse } from 'solidjs-use'

const Demo = () => {
  const { x, y } = useMouse()
  return (
    <h1>
      {x()} x {y()}
    </h1>
  )
}

export default Demo
```

Refer to [functions list](/functions) for more details.
