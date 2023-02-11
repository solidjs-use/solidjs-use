import { createSignal, getOwner } from 'solid-js'
import { unAccessor, until } from '@solidjs-use/shared'
import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'
import { defaultDocument } from '../_configurable'
import type { MaybeElementAccessor } from '@solidjs-use/shared'
import type { ConfigurableDocument } from '../_configurable'

declare global {
  interface PointerLockOptions {
    unadjustedMovement?: boolean
  }

  interface Element {
    requestPointerLock(options?: PointerLockOptions): Promise<void> | void
  }
}

type MaybeHTMLElement = HTMLElement | undefined | null

export interface UsePointerLockOptions extends ConfigurableDocument {
  pointerLockOptions?: PointerLockOptions
}

/**
 * Reactive pointer lock.
 */
export function usePointerLock(target?: MaybeElementAccessor<MaybeHTMLElement>, options: UsePointerLockOptions = {}) {
  const { document = defaultDocument, pointerLockOptions } = options

  const isSupported = useSupported(() => document && 'pointerLockElement' in document)

  const [element, setElement] = createSignal<MaybeHTMLElement>()

  const [triggerElement, setTriggerElement] = createSignal<MaybeHTMLElement>()

  let targetElement: MaybeHTMLElement

  if (isSupported()) {
    useEventListener(document, 'pointerlockchange', () => {
      const currentElement = document!.pointerLockElement ?? element()
      if (targetElement && currentElement === targetElement) {
        const elementValue = document!.pointerLockElement as MaybeHTMLElement
        setElement(elementValue)
        if (!elementValue) {
          setTriggerElement(null)
          targetElement = null
        }
      }
    })

    useEventListener(document, 'pointerlockerror', () => {
      const currentElement = document!.pointerLockElement ?? element()
      if (targetElement && currentElement === targetElement) {
        const action = document!.pointerLockElement ? 'release' : 'acquire'
        throw new Error(`Failed to ${action} pointer lock.`)
      }
    })
  }
  const owner = getOwner()

  function lock(e: MaybeElementAccessor<MaybeHTMLElement> | Event, options?: PointerLockOptions) {
    if (!isSupported()) throw new Error('Pointer Lock API is not supported by your browser.')

    const triggerElementValue = e instanceof Event ? <HTMLElement>e.currentTarget : null
    setTriggerElement(triggerElementValue)
    targetElement = e instanceof Event ? unAccessor(target) ?? triggerElementValue : unAccessor(e)
    if (!targetElement) throw new Error('Target element undefined.')
    targetElement.requestPointerLock(options ?? pointerLockOptions)

    return until(element, owner).toBe(targetElement)
  }

  async function unlock() {
    if (!element()) return false

    document!.exitPointerLock()

    await until(element, owner).toBeNull()
    return true
  }

  return {
    isSupported,
    element,
    triggerElement,
    lock,
    unlock
  }
}

export type UsePointerLockReturn = ReturnType<typeof usePointerLock>
