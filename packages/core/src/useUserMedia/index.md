---
category: Sensors
related: useDevicesList, usePermission
---

# useUserMedia

Reactive [`mediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) streaming.

## Usage

```js
import { useUserMedia } from 'solidjs-use'

const { stream, start } = useUserMedia()

start()
```

```ts
const video = document.getElementById('video')

createEffect(() => {
  // preview on a video element
  video.srcObject = stream()
})
```

### Devices

```js
import { useDevicesList, useUserMedia } from 'solidjs-use'

const { videoInputs: cameras, audioInputs: microphones } = useDevicesList({
  requestPermissions: true
})
const currentCamera = createMemo(() => cameras()[0]?.deviceId)
const currentMicrophone = createMemo(() => microphones()[0]?.deviceId)

const { stream } = useUserMedia({
  constraints: {
    video: { deviceId: currentCamera },
    audio: { deviceId: currentMicrophone }
  }
})
```
