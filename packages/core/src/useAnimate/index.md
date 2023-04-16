---
category: Animation
---

# useAnimate

Reactive [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

## Usage

### Basic Usage

The `useAnimate` function will return the animate and its control function.

```html
<template>
  <span ref="el" style="display:inline-block">useAnimate</span>
</template>

<script setup>
  import { ref } from 'vue'
  import { useAnimate } from '@vueuse/core'

  const el = ref()
  const {
    isSupported,
    animate,
    setAnimate,

    // actions
    play,
    pause,
    reverse,
    finish,
    cancel,

    // states
    pending,
    playState,
    replaceState,
    startTime,
    currentTime,
    timeline,
    playbackRate
  } = useAnimate(el, { transform: 'rotate(360deg)' }, 1000)
</script>
```

```tsx
import { createSignal } from 'solid-js'
import { useAnimate } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement>()
  const {
    play,
    pause,
    reverse,
    finish,
    cancel,
    startTime,
    currentTime,
    playbackRate,
    playState,
    replaceState,
    pending
  } = useAnimate(
    el,
    [
      { clipPath: 'circle(20% at 0% 30%)' },
      { clipPath: 'circle(20% at 50% 80%)' },
      { clipPath: 'circle(20% at 100% 30%)' }
    ],
    {
      duration: 3000,
      iterations: 5,
      direction: 'alternate',
      easing: 'cubic-bezier(0.46, 0.03, 0.52, 0.96)'
    }
  )

  return (
    <span ref={setEl} style={{ display: 'inline-block' }}>
      useAnimate
    </span>
  )
}
```

### Custom Keyframes

Either an array of keyframe objects, or a keyframe object, or a `Accessor`. See [Keyframe Formats](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats) for more details.

```ts
const keyframes = { transform: 'rotate(360deg)' }
// Or
const keyframes = [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }]
// Or
const [keyframes, setKeyframes] = createSignal([
  { clipPath: 'circle(20% at 0% 30%)' },
  { clipPath: 'circle(20% at 50% 80%)' },
  { clipPath: 'circle(20% at 100% 30%)' }
])

useAnimate(el, keyframes, 1000)
```
