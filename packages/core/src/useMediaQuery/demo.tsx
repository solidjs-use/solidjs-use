import { stringify } from '@solidjs-use/docs-utils'
import { useMediaQuery } from 'solidjs-use'

const Demo = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  return (
    <>
      <pre lang="json">{stringify({ isLargeScreen, prefersDark })}</pre>
    </>
  )
}

export default Demo
