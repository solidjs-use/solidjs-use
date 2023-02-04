import { BooleanDisplay } from '@solidjs-use/docs-components'
import { createMemo } from 'solid-js'
import { useWakeLock } from 'solidjs-use'

const Demo = () => {
  const { isActive, request, release, isSupported } = useWakeLock()
  const text = createMemo(() => (isActive() ? 'OFF' : 'ON'))
  const onClick = () => (isActive() ? request('screen') : release())
  return (
    <>
      <div>
        Is Supported: <BooleanDisplay value={isSupported()} />
      </div>
      <div>
        Is Active: <BooleanDisplay value={isActive()} />
      </div>
      <button onClick={onClick}>{text()}</button>
    </>
  )
}

export default Demo
