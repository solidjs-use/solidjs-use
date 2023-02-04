import { mergeProps } from 'solid-js'
import type { Component } from 'solid-js'

export interface BooleanDisplayProps {
  value?: boolean
  trueClass?: string
  falseClass?: string
  true?: string
  false?: string
  class?: string
}

export const BooleanDisplay: Component<BooleanDisplayProps> = props => {
  const merged = mergeProps(
    {
      value: false,
      true: 'true',
      false: 'false',
      trueClass: 'text-primary',
      falseClass: 'text-orange-400 dark:text-orange-300'
    },
    props
  )
  return (
    <>
      <span class={`${merged.value ? merged.trueClass : merged.falseClass} ${merged.class}`}>
        {merged.value ? merged.true : merged.false}
      </span>
    </>
  )
}
