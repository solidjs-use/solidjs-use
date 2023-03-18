import { BooleanDisplay } from '@solidjs-use/docs-components'
import { createSignal } from 'solid-js'
import { useScrollLock, useToggle } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement | null>(null)
  const isLockedSignal = useScrollLock(el)
  const [isLocked, toggleLock] = useToggle(isLockedSignal)

  return (
    <>
      <div class="flex flex-wrap gap-4">
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

        <div class="m-auto px-6 py-4 rounded flex flex-col w-60 gap-2 bg-gray-500/5">
          <div>
            <span opacity={isLocked() ? '75' : '100'}>isLocked</span>&nbsp;
            <BooleanDisplay value={isLocked()} />
          </div>
          <button opacity={isLocked() ? '75' : '100'} onClick={() => toggleLock()}>
            {isLocked() ? 'Unlock' : 'Lock'}
          </button>
        </div>
      </div>
    </>
  )
}

export default Demo
