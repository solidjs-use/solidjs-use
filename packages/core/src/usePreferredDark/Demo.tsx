import { BooleanDisplay, Note } from '@solidjs-use/docs-components'
import { usePreferredDark } from 'solidjs-use'

const Demo = () => {
  const prefersDark = usePreferredDark()

  return (
    <>
      <div>
        <Note class="mb-2">Prefers Dark:</Note>
        <BooleanDisplay value={prefersDark()} />
      </div>
    </>
  )
}

export default Demo
