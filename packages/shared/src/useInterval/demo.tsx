import { useInterval } from 'solidjs-use'

const Demo = () => {
  const counter = useInterval(200)

  return (
    <>
      <div>
        <p>Interval fired: {counter()}</p>
      </div>
    </>
  )
}

export default Demo
