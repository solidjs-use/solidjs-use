import { BooleanDisplay, Note } from '@solidjs-use/docs-components'
import { useScreenOrientation } from 'solidjs-use'

const Demo = () => {
  const { isSupported, orientation, angle } = useScreenOrientation()

  return (
    <>
      <Note class="mb-2">
        For best results, please use a mobile or tablet device (or use your browser's native inspector to simulate an
        orientation change)
      </Note>
      <div>
        isSupported: <BooleanDisplay value={isSupported()} />
      </div>
      <div>
        Orientation Type: <b>{orientation()}</b>
      </div>
      <div>
        Orientation Angle: <b>{angle()}</b>
      </div>
    </>
  )
}

export default Demo
