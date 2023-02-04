import { stringify } from '@solidjs-use/docs-utils'
import { useDevicePixelRatio } from 'solidjs-use'

const Demo = () => {
  const pixelRatio = useDevicePixelRatio()
  return (
    <>
      <pre lang="yaml">{stringify(pixelRatio)}</pre>
      <span class="opacity-50">
        Zoom in and out (or move the window to a screen with a different scaling factor) to see the value changes
      </span>
    </>
  )
}

export default Demo
