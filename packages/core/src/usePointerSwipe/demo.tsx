import { createSignal } from 'solid-js'
import { usePointerSwipe } from 'solidjs-use'

const Demo = () => {
  const [target, setTarget] = createSignal<HTMLElement | null>(null)
  const [container, setContainer] = createSignal<HTMLElement | null>(null)

  const [left, setLeft] = createSignal('0')
  const [opacity, setOpacity] = createSignal(1)

  const reset = () => {
    setLeft('0')
    setOpacity(1)
  }

  const { distanceX, isSwiping } = usePointerSwipe(target, {
    onSwipe () {
      const containerWidth = container()?.offsetWidth
      if (containerWidth) {
        if (distanceX() < 0) {
          const distance = Math.abs(distanceX())
          setLeft(`${distance}px`)
          setOpacity(1.25 - distance / containerWidth)
        } else {
          setLeft('0')
          setOpacity(1)
        }
      }
    },
    onSwipeEnd () {
      const containerWidth = container()?.offsetWidth
      if (distanceX() < 0 && containerWidth && Math.abs(distanceX()) / containerWidth >= 0.5) {
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
      <div
        ref={setContainer}
        class="bg-gray-200 rounded relative w-full h-[80px] m-auto flex items-center justify-center overflow-hidden"
      >
        <button onClick={reset}>Reset</button>
        <div
          ref={setTarget}
          class="absolute w-full h-full top-0 left-0 bg-primary flex items-center justify-center"
          classList={{ 'transition-all duration-200 ease-linear': !isSwiping() }}
          style={{ left: left(), opacity: opacity() }}
        >
          <p class="flex text-white items-center">Swipe -&gt;</p>
        </div>
      </div>
    </>
  )
}

export default Demo
