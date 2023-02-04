import { isClient, useDebounceFn } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { useCssVar } from '../useCssVar'
import { useEventListener } from '../useEventListener'

const topVarName = '--vueuse-safe-area-top'
const rightVarName = '--vueuse-safe-area-right'
const bottomVarName = '--vueuse-safe-area-bottom'
const leftVarName = '--vueuse-safe-area-left'

/**
 * Reactive `env(safe-area-inset-*)`
 */
export function useScreenSafeArea() {
  const [top, setTop] = createSignal('')
  const [right, setRight] = createSignal('')
  const [bottom, setBottom] = createSignal('')
  const [left, setLeft] = createSignal('')

  if (isClient) {
    const [_topCssVar, setTopCssVar] = useCssVar(topVarName)
    const [_rightCssVar, setRightCssVar] = useCssVar(rightVarName)
    const [_bottomCssVar, setBottomCssVar] = useCssVar(bottomVarName)
    const [_leftCssVar, setLeftCssVar] = useCssVar(leftVarName)

    setTopCssVar('env(safe-area-inset-top, 0px)')
    setRightCssVar('env(safe-area-inset-right, 0px)')
    setBottomCssVar('env(safe-area-inset-bottom, 0px)')
    setLeftCssVar('env(safe-area-inset-left, 0px)')

    update()

    useEventListener('resize', useDebounceFn(update))
  }

  function update() {
    setTop(getValue(topVarName))
    setRight(getValue(rightVarName))
    setBottom(getValue(bottomVarName))
    setLeft(getValue(leftVarName))
  }

  return {
    top,
    right,
    bottom,
    left,
    update
  }
}

type VarName =
  | '--vueuse-safe-area-top'
  | '--vueuse-safe-area-right'
  | '--vueuse-safe-area-bottom'
  | '--vueuse-safe-area-left'

function getValue(position: VarName) {
  return getComputedStyle(document.documentElement).getPropertyValue(position)
}
