import { Note } from '@solidjs-use/docs-components'
import { usePreferredColorScheme } from 'solidjs-use'

const Demo = () => {
  const colorScheme = usePreferredColorScheme()

  return (
    <>
      <Note class="mb-2">Preferred Color Scheme:</Note>
      <code>{colorScheme()}</code>
    </>
  )
}

export default Demo
