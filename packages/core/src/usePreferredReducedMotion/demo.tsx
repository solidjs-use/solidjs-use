import { Note } from '@solidjs-use/docs-components'
import { usePreferredReducedMotion } from 'solidjs-use'

const Demo = () => {
  const motion = usePreferredReducedMotion()

  return (
    <>
      <Note class="mb-2">Preferred motion:</Note>
      <code>{motion()}</code>
    </>
  )
}

export default Demo
