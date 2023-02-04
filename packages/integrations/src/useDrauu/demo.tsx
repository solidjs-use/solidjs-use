import { useDrauu } from '@solidjs-use/integrations/useDrauu'
import { BiRegularBrush, BiRegularReset, BiRegularUndo } from 'solid-icons/bi'
import { BsPencilFill, BsSlashLg, BsSquare } from 'solid-icons/bs'
import { FiCircle } from 'solid-icons/fi'
import { VsRedo } from 'solid-icons/vs'
import { createSignal, For } from 'solid-js'
import { Scrubber } from 'solidjs-use/useMediaControls/components/Scrubber'

const Demo = () => {
  const [colors] = createSignal(['black', '#ef4444', '#22c55e', '#3b82f6'])
  const [target, setTarget] = createSignal<HTMLDivElement>()
  const { undo, redo, canUndo, canRedo, clear, brush, setBrush } = useDrauu(target, {
    brush: {
      color: 'black',
      size: 3
    }
  })

  return (
    <>
      <div flex="~ col" place="items-center">
        <div
          shadow="~ lg"
          class="drauu-demo"
          border="rounded"
          overflow="hidden"
          max-w="screen-lg"
          h="[60vh]"
          w="full"
          flex="~ col"
        >
          <div bg="$vp-c-bg" border="1 $vp-c-divider" rounded-t flex="~ row" items="center" p="2" space="x-4">
            <div flex="~ row 1">
              {
                <For each={colors()}>
                  {color => (
                    <button
                      class="color-button"
                      classList={{ active: color === brush().color }}
                      m="r-1"
                      onClick={() => setBrush(state => ({ ...state, color }))}
                    >
                      <div style={{ background: color }} w="6" h="6" border="2 light-900 opacity-50 rounded-full" />
                    </button>
                  )}
                </For>
              }
            </div>
            <div flex="~ row 1 shrink-1" items="center" w="full" max-w="64">
              <BiRegularBrush />
              <span m="r-2" />
              <Scrubber
                class="w-full"
                value={brush().size}
                updateValue={val => {
                  setBrush({ ...brush(), size: val })
                }}
                min={1}
                max={10}
              />
            </div>
            <div flex="~ row 1" justify="end">
              <button disabled={!canUndo()} onClick={() => undo()}>
                <BiRegularUndo />
              </button>
              <button disabled={!canRedo()} onClick={() => redo()}>
                <VsRedo />
              </button>
              <button onClick={() => clear()}>
                <BiRegularReset />
              </button>
            </div>
          </div>
          <div flex="~ row 1" h="72">
            <div
              bg="$vp-c-bg"
              border="t-0 1 $vp-c-divider"
              rounded-b
              flex="~ col"
              space="y-2"
              place="items-center"
              p="2"
            >
              <button
                class="tool-button"
                onClick={() => setBrush({ ...brush(), mode: 'draw' })}
                classList={{ active: brush().mode === 'draw' }}
              >
                <BsPencilFill />
              </button>
              <button
                class="tool-button"
                onClick={() => setBrush({ ...brush(), mode: 'line' })}
                classList={{ active: brush().mode === 'line' }}
              >
                <BsSlashLg />
              </button>
              <button
                class="tool-button"
                onClick={() => setBrush({ ...brush(), mode: 'rectangle' })}
                classList={{ active: brush().mode === 'rectangle' }}
              >
                <BsSquare />
              </button>
              <button
                class="tool-button"
                onClick={() => setBrush({ ...brush(), mode: 'ellipse' })}
                classList={{ active: brush().mode === 'ellipse' }}
              >
                <FiCircle />
              </button>
            </div>
            <svg ref={setTarget} w="full" h="full" bg="white" />
          </div>
        </div>
      </div>
      <style>
        {`
.drauu-demo button:active {
    border-top: 0;
}
.drauu-demo .tool-button {
  color: var(--hope-colors-primary9);
  margin: 0rem;
  height: 2rem;
  width: 2rem;
  display: flex;
  place-content: center;
  place-items: center;
  border-radius: 9999px;
  border-style: none;
  background-color: transparent;
  padding: 0rem;
}

.drauu-demo .tool-button:disabled {
  --un-text-opacity: 1;
  color: rgba(74, 74, 74, var(--un-text-opacity));
  border-style: none;
  background-color: transparent;
  --un-text-opacity: 1;
  color: rgba(221, 225, 227, var(--un-text-opacity));
  cursor: default;
  background-color: var(--vp-c-disabled-bg);
  color: var(--vp-c-disabled-fg);
  border-bottom: 2px solid var(--vp-c-disabled-bg);
  pointer-events: none;
  text-shadow: none;
  border-top: 0;
  opacity: .8;
}

.drauu-demo .tool-button:hover {
  color: white;
}

.drauu-demo .tool-button.active {
  --un-bg-opacity: 1;
  background-color: var(--hope-colors-primary9);
  color: white;
}

.drauu-demo .color-button {
  margin: 0rem;
  height: 2rem;
  width: 2rem;
  display: flex;
  place-content: center;
  place-items: center;
  border-radius: 9999px;
  border-style: none;
  background-color: transparent;
  padding: 0rem;
  --un-text-opacity: 1;
  color: rgba(74, 74, 74, var(--un-text-opacity));
}

.drauu-demo .color-button:hover,
.drauu-demo .color-button.active {
  background-color: rgb(221,225,227);
}
      `}
      </style>
    </>
  )
}

export default Demo
