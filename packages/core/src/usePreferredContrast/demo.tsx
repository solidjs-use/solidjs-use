import { Note } from '@solidjs-use/docs-components'
import { usePreferredContrast } from 'solidjs-use'

const Demo = () => {
  const contrast = usePreferredContrast()

  return (
    <>
      <Note class="mb-2">Preferred contrast:</Note>
      <code>{contrast()}</code>
    </>
  )
}

export default Demo
