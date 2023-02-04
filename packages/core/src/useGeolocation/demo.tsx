import { stringify } from '@solidjs-use/docs-utils'
import { useGeolocation } from 'solidjs-use'

const Demo = () => {
  const { coords, locatedAt, error, resume, pause } = useGeolocation()

  return (
    <>
      <pre lang="json">
        {stringify({
          coords: {
            accuracy: coords().accuracy,
            latitude: coords().latitude,
            longitude: coords().longitude,
            altitude: coords().altitude,
            altitudeAccuracy: coords().altitudeAccuracy,
            heading: coords().heading,
            speed: coords().speed
          },
          locatedAt,
          error: error() ? error()!.message : null
        })}
      </pre>
      <button onClick={() => pause()}>Pause watch</button>
      <button onClick={() => resume()}>Start watch</button>
    </>
  )
}

export default Demo
