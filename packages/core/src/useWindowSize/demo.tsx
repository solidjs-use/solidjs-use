import { useWindowSize } from 'solidjs-use'

const Demo = () => {
  const { width, height } = useWindowSize()
  return (
    <>
      <p>
        {width()} x {height()}
      </p>
    </>
  )
}

export default Demo
