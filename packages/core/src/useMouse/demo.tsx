import { createSignal } from 'solid-js'
import { stringify } from '@solidjs-use/docs-utils'
import { useMouse, useParentElement } from 'solidjs-use'
import type { UseMouseEventExtractor } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLDivElement>()
  const parentEl = useParentElement(el)

  const mouseDefault = useMouse()

  const extractor: UseMouseEventExtractor = event => (event instanceof Touch ? null : [event.offsetX, event.offsetY])

  const mouseWithExtractor = useMouse({ target: parentEl, type: extractor })
  return (
    <div>
      <div ref={setEl}>
        <p>Basic Usage</p>
        <pre lang="yaml">
          {stringify({
            x: mouseDefault.x,
            y: mouseDefault.y,
            sourceType: mouseDefault.sourceType
          })}
        </pre>
        <p>Extractor Usage</p>
        <pre lang="yaml">
          {stringify({
            x: mouseWithExtractor.x,
            y: mouseWithExtractor.y,
            sourceType: mouseWithExtractor.sourceType
          })}
        </pre>
      </div>
    </div>
  )
}

export default Demo
