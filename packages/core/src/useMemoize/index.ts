import { hasOwn } from '@solidjs-use/shared'
import { del, set } from '@solidjs-use/shared/solid-to-vue'
import { createMutable } from 'solid-js/store'

type CacheKey = any

/**
 * Custom memoize cache handler
 */
export interface UseMemoizeCache<Key, Value> {
  /**
   * Get value for key
   */
  get: (key: Key) => Value | undefined
  /**
   * Set value for key
   */
  set: (key: Key, value: Value) => void
  /**
   * Return flag if key exists
   */
  has: (key: Key) => boolean
  /**
   * Delete value for key
   */
  delete: (key: Key) => void
  /**
   * Clear cache
   */
  clear: () => void
}

/**
 * Memoized function
 */
export interface UseMemoizeReturn<Result, Args extends unknown[]> {
  /**
   * Get result from cache or call memoized function
   */
  (...args: Args): Result
  /**
   * Call memoized function and update cache
   */
  load: (...args: Args) => Result
  /**
   * Delete cache of given arguments
   */
  delete: (...args: Args) => void
  /**
   * Clear cache
   */
  clear: () => void
  /**
   * Generate cache key for given arguments
   */
  generateKey: (...args: Args) => CacheKey
  /**
   * Cache container
   */
  cache: UseMemoizeCache<CacheKey, Result>
}

/**
 * Fallback for Vue 2 not able to make a reactive Map
 */
const getMapCompat = <Value>(): UseMemoizeCache<CacheKey, Value> => {
  const data: Record<CacheKey, Value> = createMutable({})
  return {
    get: key => data[key],
    set: (key, value) => set(data, key, value),
    has: key => hasOwn(data, key),
    delete: key => del(data, key),
    clear: () => {
      Object.keys(data).forEach(key => {
        del(data, key)
      })
    }
  }
}

export interface UseMemoizeOptions<Result, Args extends unknown[]> {
  getKey?: (...args: Args) => string | number
  cache?: UseMemoizeCache<CacheKey, Result>
}

/**
 * Reactive function result cache based on arguments.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useMemoize
 */
export function useMemoize<Result, Args extends unknown[]>(
  resolver: (...args: Args) => Result,
  options?: UseMemoizeOptions<Result, Args>
): UseMemoizeReturn<Result, Args> {
  const initCache = (): UseMemoizeCache<CacheKey, Result> => {
    if (options?.cache) return createMutable(options.cache)
    return getMapCompat()
  }
  const cache = initCache()

  /**
   * Generate key from args
   */
  const generateKey = (...args: Args) =>
    options?.getKey
      ? options.getKey(...args)
      : // Default key: Serialize args
        JSON.stringify(args)

  /**
   * Load data and save in cache
   */
  const _loadData = (key: string | number, ...args: Args): Result => {
    cache.set(key, resolver(...args))
    return cache.get(key) as Result
  }
  const loadData = (...args: Args): Result => _loadData(generateKey(...args), ...args)

  /**
   * Delete key from cache
   */
  const deleteData = (...args: Args): void => {
    cache.delete(generateKey(...args))
  }

  /**
   * Clear cached data
   */
  const clearData = () => {
    cache.clear()
  }

  const memoized: Partial<UseMemoizeReturn<Result, Args>> = (...args: Args): Result => {
    // Get data from cache
    const key = generateKey(...args)
    if (cache.has(key)) return cache.get(key) as Result
    return _loadData(key, ...args)
  }
  memoized.load = loadData
  memoized.delete = deleteData
  memoized.clear = clearData
  memoized.generateKey = generateKey
  memoized.cache = cache

  return memoized as UseMemoizeReturn<Result, Args>
}
