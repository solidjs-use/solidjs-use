import { createSignal } from 'solid-js'
import { useFullscreen } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal(null)
  const { toggle } = useFullscreen(el)

  return (
    <>
      <div class="text-center">
        <div class="flex" p="y-4">
          <video ref={setEl} class="m-auto rounded" src="https://vjs.zencdn.net/v/oceans.mp4" width="600" controls />
        </div>
        <button onClick={toggle}>Go Fullscreen</button>
      </div>
    </>
  )
}

export default Demo
