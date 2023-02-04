const resolvedPromise = Promise.resolve() as Promise<any>

export function nextTick<T = void>(this: T, fn?: (this: T) => void): Promise<void> {
  return fn ? resolvedPromise.then(this ? fn.bind(this) : fn) : resolvedPromise
}
