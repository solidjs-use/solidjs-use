import { useTimestamp } from 'solidjs-use'

const Demo = () => {
  const [timestamp] = useTimestamp()
  return (
    <>
      <div>Timestamp: {timestamp()}</div>
    </>
  )
}

export default Demo
