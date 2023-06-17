import { BooleanDisplay, Note } from '@solidjs-use/docs-components'
import { useNavigatorLanguage } from 'solidjs-use'

const Demo = () => {
  const { isSupported, language } = useNavigatorLanguage()
  return (
    <>
      <p>
        Supported: <BooleanDisplay value={isSupported()} />
      </p>
      <Note class="mb-2">Navigator Language:</Note>
      {isSupported()
        ? (
        <div>
          <code class="mr-2">{language()}</code>
        </div>
          )
        : (
        <div>The Navigator.language API is not supported in your browser.</div>
          )}
    </>
  )
}

export default Demo
