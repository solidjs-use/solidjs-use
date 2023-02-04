import { useNow } from '.'
import type { UseNowOptions } from '.'
import type { Pausable } from '@solidjs-use/shared'
import type { Accessor, Component, JSX } from 'solid-js'

interface UseNowProps extends Component<Omit<UseNowOptions<true>, 'controls'>> {
  children?: (data: { now: Accessor<Date> } & Pausable) => JSX.Element
}

export const UseNow: Component<UseNowProps> = props => {
  const data = useNow({ ...props, controls: true })

  return props.children ? props.children(data) : null
}
