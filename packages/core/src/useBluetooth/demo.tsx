import { Show } from 'solid-js'
import { useBluetooth } from 'solidjs-use'

const Demo = () => {
  const { isConnected, isSupported, device, requestDevice, error } = useBluetooth({
    acceptAllDevices: true
  })

  return (
    <>
      <div class="grid grid-cols-1 gap-x-4 gap-y-4">
        <div>
          {isSupported() ? 'Bluetooth Web API Supported' : 'Your browser does not support the Bluetooth Web API'}
        </div>
        <Show when={isSupported()}>
          <div>
            <button onClick={() => requestDevice()}>Request Bluetooth Device</button>
          </div>
        </Show>
        <Show when={device()}>
          <div>
            <p>Device Name: {device()?.name}</p>
          </div>
        </Show>
        <Show when={isConnected()}>
          <div class="bg-green-500 text-white p-3 rounded-md">
            <p>Connected</p>
          </div>
        </Show>
        <Show when={!isConnected()}>
          <div class="bg-orange-800 text-white p-3 rounded-md">
            <p>Not Connected</p>
          </div>
        </Show>
        <Show when={!!error()}>
          <div>
            <div>Errors:</div>
            <pre>
              <code class="block p-5 whitespace-pre">{String(error())}</code>
            </pre>
          </div>
        </Show>
      </div>
    </>
  )
}

export default Demo
