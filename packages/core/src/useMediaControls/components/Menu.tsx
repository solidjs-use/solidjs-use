import { createSignal } from 'solid-js'
import { onClickOutside, useEventListener } from 'solidjs-use'
import type { JSX, Component } from 'solid-js'

interface MenuProps {
  class?: string
  children: (open: () => void) => JSX.Element
  menuContent: (isOpen: boolean, close: () => void) => JSX.Element
}

export const Menu: Component<MenuProps> = props => {
  const [menu, setMenu] = createSignal<HTMLElement>()
  const [isOpen, setIsOpened] = createSignal(false)

  onClickOutside(menu, () => setIsOpened(false))
  useEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen()) setIsOpened(false)
  })

  const open = () => setIsOpened(true)
  const close = () => setIsOpened(false)
  return (
    <>
      <div class={`relative ${props.class}`}>
        {props.children(open)}
        <div ref={setMenu} classList={{ 'pointer-events-none opacity-0': !isOpen() }}>
          {props.menuContent(isOpen(), close)}
        </div>
      </div>
    </>
  )
}
