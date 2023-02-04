import { useNow } from 'solidjs-use'

const Demo = () => {
  const now = useNow()

  return (
    <>
      <div>Now: {now().toString()}</div>
    </>
  )
}

export default Demo
