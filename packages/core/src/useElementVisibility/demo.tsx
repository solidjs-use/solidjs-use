import { BooleanDisplay, Note } from '@solidjs-use/docs-components'
import { createSignal } from 'solid-js'
import { useElementVisibility } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal(null)
  const isVisible = useElementVisibility(el)

  return (
    <>
      <div>
        <Note class="mb-2">Info on the right bottom corner</Note>
        <div ref={setEl} class="max-w-100 relative area dark:bg-gray-800 shadow-lg z-60">
          Target Element (scroll down)
        </div>
      </div>
      <div class="float m-3 area shadow-lg">
        Element&nbsp;
        <BooleanDisplay value={isVisible()} true="inside" false="outside" class="font-bold" />
        &nbsp;the viewport
      </div>
    </>
  )
}

export default Demo
