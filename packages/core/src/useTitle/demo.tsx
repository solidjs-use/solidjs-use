import { Note } from '@solidjs-use/docs-components'
import { useTitle } from 'solidjs-use'

const Demo = () => {
  const [title, setTitle] = useTitle()
  return (
    <>
      <Note>Title</Note>
      <input w="30vw" value={title() ?? ''} onInput={e => setTitle(e.currentTarget.value)} type="text" />
    </>
  )
}

export default Demo
