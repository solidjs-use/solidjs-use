import { useParentElement } from 'solidjs-use'

const Demo = () => {
  const parentElement = useParentElement()
  return (
    <>
      <p>Parent element tag: {parentElement() ? parentElement()!.tagName : 'Finding...'}</p>
    </>
  )
}

export default Demo
