<h1 align="center">SOLIDJS-USE</h1>

<div align="center">

Collection of Solid utilities inspired completely by VueUse.

[![CI status][github-ci-image]][github-ci-url] [![Docs status][github-docs-image]][github-docs-url] [![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url] ![GitHub](https://img.shields.io/github/license/solidjs-use/solidjs-use?style=flat-square)

</div>

[github-ci-image]: https://github.com/solidjs-use/solidjs-use/actions/workflows/ci.yml/badge.svg
[github-ci-url]: https://github.com/solidjs-use/solidjs-use/actions/workflows/ci.yml
[github-docs-image]: https://github.com/solidjs-use/solidjs-use/actions/workflows/pages.yml/badge.svg
[github-docs-url]: https://github.com/solidjs-use/solidjs-use/actions/workflows/pages.yml
[npm-image]: https://img.shields.io/npm/v/solidjs-use?style=flat-square
[npm-url]: http://npmjs.org/package/solidjs-use
[download-image]: https://img.shields.io/npm/dm/solidjs-use?style=flat-square
[download-url]: https://npmjs.org/package/solidjs-use

<div align="center">

**[Docs](https://solidjs-use.github.io/solidjs-use/) • [Playground](https://solidjs-use.github.io/solidjs-use-playground/) • [Demo](https://github.com/solidjs-use/solidjs-use-vite-starter)**

</div>

[![](./show.png)](https://solidjs-use.github.io/solidjs-use)

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

## Demo

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
