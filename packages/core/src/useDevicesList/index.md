---
category: Sensors
---

# useDevicesList

Reactive [enumerateDevices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices) listing available input/output devices.

## Usage

```js
import { useDevicesList } from 'solidjs-use'

const { devices, videoInputs: cameras, audioInputs: microphones, audioOutputs: speakers } = useDevicesList()
```
