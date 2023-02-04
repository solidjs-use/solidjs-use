import { stringify } from '@solidjs-use/docs-utils'
import { useToggle } from '@solidjs-use/shared'
import { createMemo, createSignal } from 'solid-js'
import { useMousePressed } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement>()
  const [withTarget, toggle] = useToggle()
  const target = createMemo<HTMLElement | undefined>(() => {
    if (withTarget()) return el()
    return window as any as HTMLElement
  })

  const mouse = useMousePressed({ target })

  return (
    <>
      <div ref={setEl}>
        <pre lang="yaml">{stringify(mouse)}</pre>
        <div>
          Tracking on&nbsp;
          <button class="ml-2 button small" onClick={() => toggle()}>
            {withTarget() ? 'Demo section' : 'Entire page'}
          </button>
        </div>
      </div>
    </>
  )
}

export default Demo
