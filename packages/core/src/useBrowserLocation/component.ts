import { useBrowserLocation } from '.'
import type { Component, JSX } from 'solid-js'
import type { ConfigurableWindow } from '../_configurable'

interface UseBrowserLocationProps extends ConfigurableWindow {
  children?: (data: ReturnType<typeof useBrowserLocation>) => JSX.Element
}

export const UseBrowserLocation: Component<UseBrowserLocationProps> = props => {
  const data = useBrowserLocation(props)
  return props.children ? props.children(data) : null
}
