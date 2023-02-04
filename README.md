<p>
  <img width="100%" src="./logo.svg" alt="Solid Docs" />
<br />
Collection of Solid utilities inspired completely by VueUse
</p>

## 🚀 Features

- 🎪 [**Interactive docs & demos**](https://solidjs-use.github.io/solidjs-use)
- ⚡ **Fully tree shakeable**: Only take what you want, [bundle size](https://solidjs-use.github.io/solidjs-use/export-size)
- 🦾 **Type Strong**: Written in [TypeScript](https://www.typescriptlang.org/), with [TS Docs](https://github.com/microsoft/tsdoc)
- 🔩 **Flexible**: Configurable event filters and targets

## 🦄 Usage

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

Refer to [documentations](https://solidjs-use.github.io/solidjs-use/) for more details.

## 📦 Install

```bash
npm i solidjs-use
```

[Add ons](https://solidjs-use.github.io/solidjs-use/add-ons.html)

## playground

[playground](https://solidjs-use.github.io/solidjs-use-playground/)

## Demos

- [Vite + SolidJS + solidjs-use](https://github.com/solidjs-use/solidjs-use-vite-starter)

## 🧱 Contribute

See the [**Contributing Guide**](https://solidjs-use.github.io/solidjs-use/contributing)

## 🌸 Thanks

This project is heavily inspired by the following awesome projects.

- [vueuse](https://vueuse.org/)
- [streamich/react-use](https://github.com/streamich/react-use)
- [u3u/vue-hooks](https://github.com/u3u/vue-hooks)
- [logaretm/vue-use-web](https://github.com/logaretm/vue-use-web)
- [kripod/react-hooks](https://github.com/kripod/react-hooks)

And thanks to [all the contributors on GitHub](https://github.com/solidjs-use/solidjs-use/graphs/contributors)!

## 📄 License

[MIT License](https://github.com/solidjs-use/solidjs-use/blob/main/LICENSE) © 2023-PRESENT [dream2023](https://github.com/dream2023)
