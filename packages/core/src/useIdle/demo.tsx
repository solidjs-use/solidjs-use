import { BooleanDisplay, Note } from '@solidjs-use/docs-components'
import { createMemo } from 'solid-js'
import { useIdle, useTimestamp } from 'solidjs-use'

const Demo = () => {
  const { idle, lastActive } = useIdle(5000)

  const [now] = useTimestamp()

  const idledFor = createMemo(() => Math.floor((now() - lastActive()) / 1000))
  return (
    <>
      <Note class="mb-2">
        For demonstration purpose, the idle timeout is set to <b>5s</b> in this demo (default 1min).
      </Note>
      <div class="mb-2">
        Idle: <BooleanDisplay value={idle()} />
      </div>
      <div>
        Inactive: <b class="text-primary">{idledFor()}s</b>
      </div>
    </>
  )
}

export default Demo
