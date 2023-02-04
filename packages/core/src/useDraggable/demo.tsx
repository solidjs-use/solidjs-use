import { createSignal } from 'solid-js'
import { isClient, useDraggable } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement>()

  const innerWidth = isClient ? window.innerWidth : 200

  // `style` will be a helper computed for `{left: ?px, top: ?px;}`
  const { x, y, style } = useDraggable(el, {
    initialValue: { x: innerWidth / 4.2, y: 80 },
    preventDefault: true
  })

  return (
    <>
      <div>
        <p italic class="op50" text-center>
          Check the floating boxes
        </p>
        <div
          ref={setEl}
          p="x-4 y-2"
          border="~ gray-400/30 rounded"
          shadow="~ hover:lg"
          class="fixed bg-$vp-c-bg select-none cursor-move z-24"
          style={{ ...style(), 'touch-action': 'none' }}
        >
          👋 Drag me!
          <div class="text-sm opacity-50">
            I am at {Math.round(x())}, {Math.round(y())}
          </div>
        </div>
      </div>
    </>
  )
}

export default Demo
