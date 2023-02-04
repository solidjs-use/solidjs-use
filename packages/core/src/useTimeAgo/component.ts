import { createMutable } from 'solid-js/store'
import { useTimeAgo } from '.'
import type { UseTimeAgoOptions, UseTimeAgoReturn } from '.'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { Component, JSX } from 'solid-js'

interface UseTimeAgoComponentOptions extends Omit<UseTimeAgoOptions<true>, 'controls'> {
  time: MaybeAccessor<Date | number | string>
  children?: (data: UseTimeAgoReturn<true>) => JSX.Element
}

export const UseTimeAgo: Component<UseTimeAgoComponentOptions> = props => {
  const data = createMutable(useTimeAgo(() => props.time as number, { ...props, controls: true }))

  return props.children ? props.children(data) : null
}
