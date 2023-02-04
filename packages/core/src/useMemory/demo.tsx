import { Show } from 'solid-js'
import { useMemory } from 'solidjs-use'

const Demo = () => {
  const size = (v: number) => {
    const kb = v / 1024 / 1024
    return `${kb.toFixed(2)} MB`
  }
  const { isSupported, memory } = useMemory()
  return (
    <>
      {isSupported() && memory() ? (
        <div class="inline-grid grid-cols-2 gap-x-4 gap-y-2">
          <Show when={!!memory()}>
            <>
              <div opacity="50">Used</div>
              <div>{size(memory()!.usedJSHeapSize)}</div>
              <div opacity="50">Allocated</div>
              <div>{size(memory()!.totalJSHeapSize)}</div>
              <div opacity="50">Limit</div>
              <div>{size(memory()!.jsHeapSizeLimit)}</div>
            </>
          </Show>
        </div>
      ) : (
        <div>Your browser does not support performance memory API</div>
      )}
    </>
  )
}

export default Demo
