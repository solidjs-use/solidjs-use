import { usePreferredDark } from '.'
import type { Component, JSX } from 'solid-js'
import type { ConfigurableWindow } from '../_configurable'

interface UsePreferredDarkProps extends ConfigurableWindow {
  children?: (data: ReturnType<typeof usePreferredDark>) => JSX.Element
}

export const UsePreferredDark: Component<UsePreferredDarkProps> = props => {
  const data = usePreferredDark(props)

  return props.children ? props.children(data) : null
}
