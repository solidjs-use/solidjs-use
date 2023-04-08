# @solidjs-use/rxjs

[![NPM version](https://img.shields.io/npm/v/@solidjs-use/rxjs?color=a1b858)](https://www.npmjs.com/package/@solidjs-use/rxjs)

> This is an extension of [solidjs-use](https://github.com/solidjs-use/solidjs-use), enabling a natural way of using RxJS.

## Install

```bash
npm i solidjs-use @solidjs-use/rxjs rxjs
```

## Functions

- [`from`](https://solidjs-use.github.io/solidjs-use/rxjs/from) — / fromEvent
- [`toObserver`](https://solidjs-use.github.io/solidjs-use/rxjs/toObserver) — sugar function to convert a `ref` into an RxJS [Observer](https://rxjs.dev/guide/observer)
- [`useObservable`](https://solidjs-use.github.io/solidjs-use/rxjs/useObservable) — use an RxJS [`Observable`](https://rxjs.dev/guide/observable)
- [`useSubject`](https://solidjs-use.github.io/solidjs-use/rxjs/useSubject) — bind an RxJS [`Subject`](https://rxjs.dev/guide/subject) to a `ref` and propagate value changes both ways
- [`useSubscription`](https://solidjs-use.github.io/solidjs-use/rxjs/useSubscription) — use an RxJS [`Subscription`](https://rxjs.dev/guide/subscription) without worrying about unsubscribing from it or creating memory leaks

## Links

- [solidjs-use](https://solidjs-use.github.io/solidjs-use/rxjs)
