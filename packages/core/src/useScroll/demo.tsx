import { BooleanDisplay } from '@solidjs-use/docs-components'
import { createMemo, createSignal } from 'solid-js'
import { useScroll } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement | null>(null)
  const [smooth, setSmooth] = createSignal(false)
  const behavior = createMemo(() => (smooth() ? 'smooth' : 'auto'))
  const { x, setX, y, setY, isScrolling, arrivedState, directions } = useScroll(el, { behavior })

  return (
    <>
      <div class="flex">
        <div ref={setEl} class="w-300px h-300px m-auto overflow-scroll bg-gray-500/5 rounded">
          <div class="w-500px h-400px relative">
            <div position="absolute left-0 top-0" bg="gray-500/5" p="x-2 y-1">
              TopLeft
            </div>
            <div position="absolute left-0 bottom-0" bg="gray-500/5" p="x-2 y-1">
              BottomLeft
            </div>
            <div position="absolute right-0 top-0" bg="gray-500/5" p="x-2 y-1">
              TopRight
            </div>
            <div position="absolute right-0 bottom-0" bg="gray-500/5" p="x-2 y-1">
              BottomRight
            </div>
            <div position="absolute left-1/3 top-1/3" bg="gray-500/5" p="x-2 y-1">
              Scroll Me
            </div>
          </div>
        </div>

        <div class="m-auto w-280px pl-4">
          <div class="px-6 py-4 rounded grid grid-cols-[120px_auto] gap-2 bg-gray-500/5">
            <span text="right" opacity="75" class="py-4">
              X Position
            </span>
            <div class="text-primary">
              <div>
                <input
                  value={x().toFixed(1)}
                  onInput={e => setX(parseFloat(e.currentTarget.value))}
                  type="number"
                  min="0"
                  max="200"
                  step="10"
                  class="w-full !min-w-0"
                />
              </div>
            </div>
            <span text="right" opacity="75" class="py-4">
              Y Position
            </span>
            <div class="text-primary">
              <div>
                <input
                  value={y().toFixed(1)}
                  onInput={e => setY(parseFloat(e.currentTarget.value))}
                  type="number"
                  min="0"
                  max="100"
                  step="10"
                  class="w-full !min-w-0"
                />
              </div>
            </div>
            <label for="smooth-scrolling-option" text="right" opacity="75">
              Smooth scrolling
            </label>
            <span>
              <input
                id="smooth-scrolling-option"
                checked={smooth()}
                onInput={e => setSmooth(e.currentTarget.checked)}
                type="checkbox"
              />
            </span>
            <span text="right" opacity="75">
              isScrolling
            </span>
            <BooleanDisplay value={isScrolling()} />
            <div text="right" opacity="75">
              Top Arrived
            </div>
            <BooleanDisplay value={arrivedState.top} />
            <div text="right" opacity="75">
              Right Arrived
            </div>
            <BooleanDisplay value={arrivedState.right} />
            <div text="right" opacity="75">
              Bottom Arrived
            </div>
            <BooleanDisplay value={arrivedState.bottom} />
            <div text="right" opacity="75">
              Left Arrived
            </div>
            <BooleanDisplay value={arrivedState.left} />
            <div text="right" opacity="75">
              Scrolling Up
            </div>
            <BooleanDisplay value={directions.top} />
            <div text="right" opacity="75">
              Scrolling Right
            </div>
            <BooleanDisplay value={arrivedState.right} />
            <div text="right" opacity="75">
              Scrolling Down
            </div>
            <BooleanDisplay value={arrivedState.bottom} />
            <div text="right" opacity="75">
              Scrolling Left
            </div>
            <BooleanDisplay value={arrivedState.left} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Demo
