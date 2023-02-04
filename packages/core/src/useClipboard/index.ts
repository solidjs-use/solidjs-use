/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import { unAccessor, useTimeoutFn } from '@solidjs-use/shared'
import { createMemo, createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'
import { defaultNavigator } from '../_configurable'
import type { ConfigurableNavigator } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { WindowEventName } from '../useEventListener'

export interface UseClipboardOptions<Source> extends ConfigurableNavigator {
  /**
   * Enabled reading for clipboard
   *
   * @default false
   */
  read?: boolean

  /**
   * Copy source
   */
  source?: Source

  /**
   * Milliseconds to reset state of `copied` Signal
   *
   * @default 1500
   */
  copiedDuring?: number

  /**
   * Whether fallback to document.execCommand('copy') if clipboard is undefined.
   *
   * @default false
   */
  legacy?: boolean
}

export interface UseClipboardReturn<Optional> {
  isSupported: Accessor<boolean>
  text: Accessor<string>
  copied: Accessor<boolean>
  copy: Optional extends true ? (text?: string) => Promise<void> : (text: string) => Promise<void>
}

/**
 * Reactive Clipboard API.
 */
export function useClipboard(options?: UseClipboardOptions<undefined>): UseClipboardReturn<false>
export function useClipboard(options: UseClipboardOptions<MaybeAccessor<string>>): UseClipboardReturn<true>
export function useClipboard(
  options: UseClipboardOptions<MaybeAccessor<string> | undefined> = {}
): UseClipboardReturn<boolean> {
  const { navigator = defaultNavigator, read = false, source, copiedDuring = 1500, legacy = false } = options

  const events = ['copy', 'cut']
  const isClipboardApiSupported = useSupported(() => navigator && 'clipboard' in navigator)
  const isSupported = createMemo(() => isClipboardApiSupported() || legacy)

  const [text, setText] = createSignal('')
  const [copied, setCopied] = createSignal(false)

  const timeout = useTimeoutFn(() => setCopied(false), copiedDuring)

  function updateText() {
    if (isClipboardApiSupported()) {
      navigator!.clipboard.readText().then(value => {
        setText(value)
      })
    } else {
      setText(legacyRead())
    }
  }

  if (isSupported() && read) {
    for (const event of events) useEventListener(event as WindowEventName, updateText)
  }

  async function copy(value = unAccessor(source)) {
    if (isSupported() && value != null) {
      if (isClipboardApiSupported()) await navigator!.clipboard.writeText(value)
      else legacyCopy(value)
      setText(value)
      setCopied(true)
      timeout.start()
    }
  }

  function legacyCopy(value: string) {
    const ta = document.createElement('textarea')
    ta.value = value ?? ''
    ta.style.position = 'absolute'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }

  function legacyRead() {
    return document?.getSelection?.()?.toString() ?? ''
  }

  return {
    isSupported,
    text,
    copied,
    copy
  }
}
