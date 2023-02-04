import { createSignal } from 'solid-js'
import { useSwipe } from 'solidjs-use'

const Demo = () => {
  const [target, setTarget] = createSignal<HTMLElement | null>(null)
  const [container, setContainer] = createSignal<HTMLElement | null>(null)
  const [left, setLeft] = createSignal('0')
  const [opacity, setOpacity] = createSignal(1)

  const reset = () => {
    setLeft('0')
    setOpacity(1)
  }

  const { direction, isSwiping, lengthX, lengthY } = useSwipe(target, {
    passive: false,
    onSwipe() {
      const containerWidth = container()?.offsetWidth
      if (containerWidth) {
        if (lengthX() < 0) {
          const length = Math.abs(lengthX())
          setLeft(`${length}px`)
          setOpacity(1.1 - length / containerWidth)
        } else {
          setLeft('0')
          setOpacity(1)
        }
      }
    },
    onSwipeEnd() {
      const containerWidth = container()?.offsetWidth
      if (lengthX() < 0 && containerWidth && Math.abs(lengthX()) / containerWidth >= 0.5) {
        setLeft('100%')
        setOpacity(0)
      } else {
        setLeft('0')
        setOpacity(1)
      }
    }
  })

  return (
    <>
      <div>
        <div ref={setContainer} class="container select-none">
          <button onClick={reset}>Reset</button>
          <div
            ref={setTarget}
            class="overlay"
            classList={{ animated: !isSwiping() }}
            style={{ left: left(), opacity: opacity() }}
          >
            <p>Swipe right</p>
          </div>
        </div>
        <p class="status">
          Direction: {direction() ? direction() : '-'} <br />
          lengthX: {lengthX()} | lengthY: {lengthY()}
        </p>
      </div>
      <style>
        {`.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  height: 4em;
  overflow: hidden;
}

.overlay {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background: var(--hope-colors-primary9);
}

.overlay.animated {
  transition: all 0.2s ease-in-out;
}

.overlay > p {
  color: #fff;
  font-weight: bold;
  text-align: center;
  overflow:hidden;
  white-space: nowrap;
}

.status {
  text-align: center;
}`}
      </style>
    </>
  )
}

export default Demo
