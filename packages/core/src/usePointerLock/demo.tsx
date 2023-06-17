import { createEffect, createSignal, on } from 'solid-js'
import { useEventListener, useMouse, usePointerLock } from 'solidjs-use'

const Demo = () => {
  const { lock, unlock, element } = usePointerLock()
  const { x, y } = useMouse({ type: 'movement' })
  const [rotY, setRotY] = createSignal(-45)
  const [rotX, setRotX] = createSignal(0)

  createEffect(
    on([x, y], ([x, y]) => {
      if (!element()) return
      setRotY(y => y + x / 2)
      setRotX(x => x + y / 2)
    })
  )

  const [wrap, setWrap] = createSignal<HTMLElement>()
  useEventListener<MouseEvent>(wrap, 'mousedown', lock, { capture: true })

  return (
    <>
      <div flex justify-center items-center box-border perspective-300>
        <div
          cursor-all-scroll
          relative
          w-100px
          h-100px
          ref={setWrap}
          preserve-3d
          onMouseUp={() => unlock()}
          style={{
            '--rotY': rotY(),
            '--rotX': rotX(),
            transform: 'rotateY(calc(var(--rotY) * 1deg)) rotateX(calc(var(--rotX) * 1deg))'
          }}
        >
          <span
            class="absolute top-0 left-0 w-full h-full b-1 b-solid backface-hidden bg-emerald-4 bg-opacity-20 bg-center bg-[length:75%] bg-no-repeat"
            style="--i: 1; --un-url: url(/solidjs.svg); transform: rotateX(calc(90deg * var(--i))) translateZ(50px);background-image: var(--un-url)"
          />
          <span
            class="absolute top-0 left-0 w-full h-full b-1 b-solid backface-hidden bg-emerald-4 bg-opacity-20 bg-center bg-[length:75%] bg-no-repeat"
            style="--i: -1; --un-url: url(/solidjs-use.svg); transform: rotateX(calc(90deg * var(--i))) translateZ(50px);background-image: var(--un-url)"
          />
          <span
            class="absolute top-0 left-0 w-full h-full b-1 b-solid backface-hidden bg-emerald-4 bg-opacity-20 bg-center bg-[length:75%] bg-no-repeat"
            style="--i: 0; --un-url: url(/solidjs.svg); transform: rotateY(calc(90deg * var(--i))) translateZ(50px);background-image: var(--un-url)"
          />
          <span
            class="absolute top-0 left-0 w-full h-full b-1 b-solid backface-hidden bg-emerald-4 bg-opacity-20 bg-center bg-[length:75%] bg-no-repeat"
            style="--i: 1;--un-url: url(/solidjs-use.svg); transform: rotateY(calc(90deg * var(--i))) translateZ(50px);background-image: var(--un-url)"
          />
          <span
            class="absolute top-0 left-0 w-full h-full b-1 b-solid backface-hidden bg-emerald-4 bg-opacity-20 bg-center bg-[length:75%] bg-no-repeat"
            style="--i: 2;--un-url: url(/solidjs.svg); transform: rotateY(calc(90deg * var(--i))) translateZ(50px);background-image: var(--un-url)"
          />
          <span
            class="absolute top-0 left-0 w-full h-full b-1 b-solid backface-hidden bg-emerald-4 bg-opacity-20 bg-center bg-[length:75%] bg-no-repeat"
            style="--i: 3;--un-url: url(/solidjs-use.svg); transform: rotateY(calc(90deg * var(--i))) translateZ(50px);background-image: var(--un-url)"
          />
        </div>
      </div>
    </>
  )
}

export default Demo
