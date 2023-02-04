import { usePageLeave } from 'solidjs-use'

const Demo = () => {
  const isLeft = usePageLeave()

  return (
    <>
      <pre lang="json">{JSON.stringify({ isLeft: isLeft() }, null, 2)}</pre>
    </>
  )
}

export default Demo
