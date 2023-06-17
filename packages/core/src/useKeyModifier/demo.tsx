import { useKeyModifier } from 'solidjs-use'
import type { ParentComponent } from 'solid-js'

const Key: ParentComponent<{ value: boolean }> = props => (
    <div
      class="font-mono px-4 py-2 rounded"
      classList={{
        'opacity-100 c-white bg-primary bg-opacity-15': props.value,
        'opacity-50 bg-gray-600 bg-opacity-10 dark:(bg-gray-400 bg-opacity-10)': !props.value
      }}
    >
      {props.children}
    </div>
)

const Demo = () => {
  const capsLock = useKeyModifier('CapsLock')
  const numLock = useKeyModifier('NumLock')
  const scrollLock = useKeyModifier('ScrollLock')
  const shift = useKeyModifier('Shift')
  const control = useKeyModifier('Control')
  const alt = useKeyModifier('Alt')
  return (
    <>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Key value={capsLock() ?? false}>capsLock</Key>
        <Key value={numLock() ?? false}>numLock</Key>
        <Key value={scrollLock() ?? false}>scrollLock</Key>
        <Key value={shift() ?? false}>shift</Key>
        <Key value={control() ?? false}>control</Key>
        <Key value={alt() ?? false}>alt</Key>
      </div>
    </>
  )
}

export default Demo
