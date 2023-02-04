import { useObjectUrl } from '.'
import type { UseObjectUrlOptions, UseObjectUrlReturn } from '.'
import type { Component, JSX } from 'solid-js'

export interface UseObjectUrlComponentOptions extends UseObjectUrlOptions {
  children?: (data: UseObjectUrlReturn) => JSX.Element
}

export const UseObjectUrl: Component<UseObjectUrlComponentOptions> = props => {
  const data = useObjectUrl(props.object)

  return props.children ? props.children(data) : null
}
