import { useFps } from 'solidjs-use'

const Demo = () => {
  const fps = useFps()
  return (
    <>
      <div>FPS: {fps()}</div>
    </>
  )
}

export default Demo
