import { createSignal } from 'solid-js'
import type { Accessor, Setter, Signal } from 'solid-js'

export function isAccessor<T>(val?: unknown): val is Accessor<T> {
  return typeof val === 'function'
}

export function isSignal<T>(val?: unknown): val is Signal<T> {
  return Array.isArray(val) && val.length === 2 && typeof val[0] === 'function' && typeof val[1] === 'function'
}

export type SimpleSetter<T> = (v?: T | ((val: T | undefined) => T)) => void

const noop = () => {}

export function toSignal<T>(v: T | Accessor<T> | Signal<T>): Signal<T> {
  if (isSignal<T>(v)) {
    return v
  } else if (isAccessor(v)) {
    return [v, noop as Setter<T>]
  }
  return createSignal(v)
}

export function toAccessor<T>(v: T | undefined | null | Accessor<T | null | undefined>) {
  if (v === undefined || !isAccessor(v)) {
    return createSignal(v)[0]
  }
  return v
}

export function getSetterValue<T>(v: any, pre: T): T {
  return typeof v === 'function' ? v(pre) : v
}

export function set<T>(target: any, key: any, val: T): T {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  target[key] = val
  return val
}

export function del(target: any, key: any): void {
  if (Array.isArray(target)) {
    target.splice(key, 1)
    return
  }
  delete target[key]
}

export const isFunction = <T extends Function>(val: any): val is T => typeof val === 'function'
