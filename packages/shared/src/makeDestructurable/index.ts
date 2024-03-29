/**
 * Make isomorphic destructurable for object and array at the same time.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/makeDestructurable
 */
export function makeDestructurable<T extends Record<string, unknown>, A extends readonly any[]>(obj: T, arr: A): T & A {
  if (typeof Symbol !== 'undefined') {
    const clone = { ...obj }

    Object.defineProperty(clone, Symbol.iterator, {
      enumerable: false,
      value() {
        let index = 0
        return {
          next: () => ({
            value: arr[index++],
            done: index > arr.length
          })
        }
      }
    })

    return clone as T & A
  }
  return Object.assign([...arr], obj) as unknown as T & A
}
