import { isIOS, resolveAccessor, tryOnCleanup, unAccessor } from '@solidjs-use/shared'
import { createEffect, createSignal, on } from 'solid-js'
import { useEventListener } from '../useEventListener'
import type { Signal } from 'solid-js'
import type { Fn, MaybeAccessor } from '@solidjs-use/shared'

function checkOverflowScroll(ele: Element): boolean {
  const style = window.getComputedStyle(ele)
  if (style.overflowX === 'scroll' || style.overflowY === 'scroll') {
    return true
  }
  const parent = ele.parentNode as Element

  if (!parent || parent.tagName === 'BODY') return false

  return checkOverflowScroll(parent)
}

function preventDefault(rawEvent: TouchEvent): boolean {
  const e = rawEvent || window.event

  const _target = e.target as Element

  // Do not prevent if element or parentNodes have overflow: scroll set.
  if (checkOverflowScroll(_target)) return false

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true

  if (e.preventDefault) e.preventDefault()

  return false
}

/**
 * Lock scrolling of the element.
 */
export function useScrollLock(
  element: MaybeAccessor<HTMLElement | SVGElement | Window | Document | null | undefined>,
  initialState = false
) {
  const [isLocked, setIsLocked] = createSignal(initialState)
  let stopTouchMoveListener: Fn | null = null
  let initialOverflow: CSSStyleDeclaration['overflow']

  createEffect(
    on(resolveAccessor(element), el => {
      if (el) {
        const ele = el as HTMLElement
        initialOverflow = ele.style.overflow
        if (isLocked()) ele.style.overflow = 'hidden'
      }
    })
  )

  const lock = () => {
    const ele = unAccessor(element) as HTMLElement
    if (!ele || isLocked()) return
    if (isIOS) {
      stopTouchMoveListener = useEventListener(
        ele,
        'touchmove',
        e => {
          preventDefault(e as TouchEvent)
        },
        { passive: false }
      )
    }
    ele.style.overflow = 'hidden'
    setIsLocked(true)
  }

  const unlock = () => {
    const ele = unAccessor(element) as HTMLElement
    if (!ele || !isLocked()) return
    isIOS && stopTouchMoveListener?.()
    ele.style.overflow = initialOverflow
    setIsLocked(false)
  }

  tryOnCleanup(unlock)

  return [
    isLocked,
    (v?: boolean) => {
      if (v) lock()
      else unlock()
    }
  ] as Signal<boolean>
}
