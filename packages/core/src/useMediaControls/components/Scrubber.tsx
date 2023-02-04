import { createEffect, createSignal, mergeProps, on } from 'solid-js'
import { useEventListener, useMouseInElement } from 'solidjs-use'
import type { Component, JSXElement } from 'solid-js'

interface ScrubberProps {
  min?: number
  max?: number
  secondary?: number
  value: number
  class?: string
  updateValue: (val: number) => void
  children?: (pendingValue: number, position: string) => JSXElement
}

export const Scrubber: Component<ScrubberProps> = props => {
  const merged = mergeProps({ min: 1, max: 100, secondary: 0 }, props)
  const [scrubber, setScrubber] = createSignal<HTMLElement>()
  const [scrubbing, setScrubbing] = createSignal(false)
  const [pendingValue, setPendingValue] = createSignal(0)

  useEventListener('mouseup', () => setScrubbing(false))
  const { elementX, elementWidth } = useMouseInElement(scrubber)

  createEffect(
    on([scrubbing, elementX], () => {
      const progress = Math.max(0, Math.min(merged.min, elementX() / elementWidth()))
      setPendingValue(progress * merged.max)
      if (scrubbing()) {
        merged.updateValue(pendingValue())
      }
    })
  )

  return (
    <>
      <div
        ref={setScrubber}
        class={`relative h-2 rounded cursor-pointer select-none bg-black dark:bg-white dark:bg-opacity-10 bg-opacity-20 ${merged.class}`}
        onMouseDown={() => setScrubbing(true)}
      >
        <div class="relative overflow-hidden h-full w-full rounded">
          <div
            class="h-full absolute opacity-30 left-0 top-0 bg-emerald-700 w-full rounded"
            style={{ transform: `translateX(${(merged.secondary / merged.max) * 100 - 100}%)` }}
          />
          <div
            class="relative h-full w-full rounded bg"
            style={{
              transform: `translateX(${(merged.value / merged.max) * 100 - 100}%)`,
              'background-color': 'var(--hope-colors-primary9)'
            }}
          />
        </div>
        <div class="absolute inset-0 hover:opacity-100 opacity-0" classList={{ '!opacity-100': scrubbing() }}>
          {merged.children?.(pendingValue(), `${Math.max(0, Math.min(elementX(), elementWidth()))}px`)}
        </div>
      </div>
    </>
  )
}
