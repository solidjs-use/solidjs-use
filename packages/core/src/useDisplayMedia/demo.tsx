import { createEffect, createSignal } from 'solid-js'
import { useDisplayMedia } from 'solidjs-use'

const Demo = () => {
  const [video, setVideo] = createSignal<HTMLVideoElement>()
  const { stream, enabled, setEnabled } = useDisplayMedia()

  createEffect(() => {
    if (video()) {
      video()!.srcObject = stream()!
    }
  })
  return (
    <>
      <div class="flex flex-col gap-4 text-center">
        <div>
          <button onClick={() => setEnabled(state => !state)}>{enabled() ? 'Stop' : 'Start'} sharing my screen</button>
        </div>

        <div>
          <video ref={setVideo} muted autoplay controls class="h-100 w-auto" />
        </div>
      </div>
    </>
  )
}

export default Demo
