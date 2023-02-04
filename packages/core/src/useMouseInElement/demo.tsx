import { stringify } from '@solidjs-use/docs-utils'
import { createSignal } from 'solid-js'
import { useMouseInElement } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement>()
  const mouse = useMouseInElement(el)

  return (
    <>
      <div flex="~" gap="4">
        <div
          class="el"
          w="40"
          ref={setEl}
          h="40"
          bg="gray-400/20"
          border="rounded"
          flex="~"
          place="content-center"
          select="none"
        >
          <div m="auto">Hover me</div>
        </div>
        <pre lang="yaml">
          {stringify({
            x: mouse.x,
            y: mouse.y,
            sourceType: mouse.sourceType,
            elementX: mouse.elementX,
            elementY: mouse.elementY,
            elementPositionX: mouse.elementPositionX,
            elementPositionY: mouse.elementPositionY,
            elementHeight: mouse.elementHeight,
            elementWidth: mouse.elementWidth,
            isOutside: mouse.isOutside
          })}
        </pre>
      </div>
    </>
  )
}

export default Demo
