import { Note } from '@solidjs-use/docs-components'
import { useDeviceMotion } from 'solidjs-use'

const Demo = () => {
  const motion = useDeviceMotion()
  return (
    <>
      <Note class="mb-2">Device Motion:</Note>
      <pre lang="json">
        {JSON.stringify(
          {
            acceleration: motion.acceleration(),
            accelerationIncludingGravity: motion.accelerationIncludingGravity(),
            rotationRate: motion.rotationRate(),
            interval: motion.interval()
          },
          null,
          2
        )}
      </pre>
    </>
  )
}

export default Demo
