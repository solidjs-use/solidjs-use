/**
 * Reactively omit fields from a reactive object
 */
export function omitMutable<T extends object, K extends keyof T>(obj: T, ...keys: Array<K | K[]>): Omit<T, K> {
  const flatKeys = keys.flat() as K[]
  const res: any = {}
  const allKeys = Object.keys(obj) as K[]
  allKeys
    .filter(key => !flatKeys.includes(key))
    .forEach(key => {
      if (key in obj) {
        Object.defineProperty(res, key, {
          enumerable: true,
          get() {
            return obj[key]
          },
          set(val) {
            obj[key] = val
            return val
          }
        })
      }
    })
  return res
}
