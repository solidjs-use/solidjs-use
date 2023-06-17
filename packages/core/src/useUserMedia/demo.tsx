import { createEffect, createSignal, For } from 'solid-js'
import { useDevicesList, useUserMedia } from 'solidjs-use'

const Demo = () => {
  const [currentCamera, setCurrentCamera] = createSignal<string>()
  const { videoInputs: cameras } = useDevicesList({
    requestPermissions: true,
    onUpdated () {
      if (!cameras().find(i => i.deviceId === currentCamera())) setCurrentCamera(cameras()[0]?.deviceId)
    }
  })

  const [video, setVideo] = createSignal<HTMLVideoElement>()
  const { stream, enabled, setEnabled } = useUserMedia({
    constraints: { video: { deviceId: currentCamera() } }
  })

  createEffect(() => {
    if (video()) video()!.srcObject = stream()!
  })
  return (
    <>
      <div class="flex flex-col gap-4 text-center">
        <div>
          <button onClick={() => setEnabled(state => !state)}>{enabled() ? 'Stop' : 'Start'}</button>
        </div>
        <div>
          <For each={cameras()}>
            {camera => (
              <div class="px-2 py-1 cursor-pointer" classList={{ 'text-primary': currentCamera() === camera.deviceId }}>
                {camera.label}
              </div>
            )}
          </For>
        </div>
        <div>
          <video ref={setVideo} muted autoplay controls class="h-100 w-auto" />
        </div>
      </div>
    </>
  )
}

export default Demo
