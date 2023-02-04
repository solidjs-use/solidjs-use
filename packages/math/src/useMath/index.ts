import { reactify, type ArgumentsType, type Reactified } from 'solidjs-use'

export type UseMathKeys = keyof { [K in keyof Math as Math[K] extends (...args: any) => any ? K : never]: unknown }

/**
 * Reactive `Math` methods.
 */
export function useMath<K extends keyof Math>(
  key: K,
  ...args: ArgumentsType<Reactified<Math[K]>>
): ReturnType<Reactified<Math[K]>> {
  return reactify(Math[key] as any)(...args) as any
}
