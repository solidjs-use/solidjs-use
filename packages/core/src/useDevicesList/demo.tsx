import { FiCamera, FiHeadphones } from 'solid-icons/fi'
import { TbMicrophone } from 'solid-icons/tb'
import { For } from 'solid-js'
import { useDevicesList } from 'solidjs-use'

const Demo = () => {
  const {
    videoInputs: cameras,
    audioInputs: microphones,
    audioOutputs: speakers
  } = useDevicesList({
    requestPermissions: true
  })
  return (
    <>
      <div class="grid grid-cols-3 text-center" gap="2" p="y-4">
        <FiCamera class="text-2xl opacity-50 m-auto" />
        <TbMicrophone class="text-2xl opacity-50 m-auto" />
        <FiHeadphones class="text-2xl opacity-50 m-auto" />

        <div class="opacity-50 uppercase tracking-wide text-sm">Camera ({cameras().length})</div>
        <div class="opacity-50 uppercase tracking-wide text-sm">Microphones ({microphones().length})</div>
        <div class="opacity-50 uppercase tracking-wide text-sm">Speakers ({speakers().length})</div>

        <div>
          <For each={cameras()}>{camera => <div text="sm">{camera.label}</div>}</For>
        </div>

        <div>
          <For each={microphones()}>{microphone => <div text="sm">{microphone.label}</div>}</For>
        </div>

        <div>
          <For each={speakers()}>{speaker => <div text="sm">{speaker.label}</div>}</For>
        </div>
      </div>
    </>
  )
}

export default Demo
