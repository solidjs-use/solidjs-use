import { writableComputed } from '@solidjs-use/shared/solid-to-vue'
import { useColorMode } from '../useColorMode'
import { usePreferredDark } from '../usePreferredDark'
import { defaultWindow } from '../_configurable'
import type { UseColorModeOptions, BasicColorMode } from '../useColorMode'

export interface UseDarkOptions extends Omit<UseColorModeOptions, 'modes' | 'onChanged'> {
  /**
   * Value applying to the target element when isDark=true
   *
   * @default 'dark'
   */
  valueDark?: string

  /**
   * Value applying to the target element when isDark=false
   *
   * @default ''
   */
  valueLight?: string

  /**
   * A custom handler for handle the updates.
   * When specified, the default behavior will be overridden.
   *
   * @default undefined
   */
  onChanged?: (isDark: boolean, defaultHandler: (mode: BasicColorMode) => void, mode: BasicColorMode) => void
}

/**
 * Reactive dark mode with auto data persistence.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useDark
 */
export function useDark(options: UseDarkOptions = {}) {
  const { valueDark = 'dark', valueLight = '', window = defaultWindow } = options

  const { mode, setMode } = useColorMode({
    ...options,
    onChanged: (mode, defaultHandler) => {
      if (options.onChanged) options.onChanged?.(mode === 'dark', defaultHandler, mode)
      else defaultHandler(mode)
    },
    modes: {
      dark: valueDark,
      light: valueLight
    }
  })

  const preferredDark = usePreferredDark({ window })

  const isDark = writableComputed<boolean>({
    get() {
      return mode() === 'dark'
    },
    set(v) {
      if (v === preferredDark()) setMode('auto')
      else setMode(v ? 'dark' : 'light')
    }
  })

  return isDark
}
