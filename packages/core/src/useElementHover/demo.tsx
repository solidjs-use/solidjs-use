import { createSignal } from 'solid-js'
import { useElementHover } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement>()
  const isHovered = useElementHover(el)

  return (
    <>
      <button ref={setEl}>{isHovered() ? 'Thank you!' : 'Hover me'}</button>
    </>
  )
}

export default Demo
