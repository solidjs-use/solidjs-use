---
category: Browser
---

# useMediaControls

Reactive media controls for both `audio` and `video` elements.

## Usage

### Basic Usage

```jsx
import { createSignal, onMount } from 'solid-js'
import { useMediaControls } from 'solidjs-use'

const Demo = () => {
  const [video, setVideo] = createSignal()

  const { playing, setPlaying, currentTime, setCurrentTime, duration, volume, setVolume } = useMediaControls(video, {
    src: 'video.mp4'
  })

  // Change initial media properties
  onMount(() => {
    setVolume(0.5)
    setCurrentTime(60)
  })
  return (
    <>
      <video ref={setVideo} />
      <button
        onClick={() => {
          setPlaying(state => !state)
        }}
      >
        Play / Pause
      </button>
      <span>
        {currentTime()} / {duration()}
      </span>
    </>
  )
}
```

### Providing Captions, Subtitles, etc

You can provide captions, subtitles, etc in the `tracks` options of the
`useMediaControls` function. The function will return an array of tracks
along with two functions for controlling them, `enableTrack`, `disableTrack`, and `selectedTrack`.
Using these you can manage the currently selected track. `selectedTrack` will
be `-1` if there is no selected track.

```jsx
import { createSignal } from 'solid-js'
import { useMediaControls } from 'solidjs-use'

const Demo = () => {
  const [video, setVideo] = createSignal()
  const { tracks, enableTrack } = useMediaControls(video, {
    src: 'video.mp4',
    tracks: [
      {
        default: true,
        src: './subtitles.vtt',
        kind: 'subtitles',
        label: 'English',
        srcLang: 'en'
      }
    ]
  })

  return (
    <>
      <video ref={setVideo} />
      {<For each={tracks}>{track => <button onClick={() => enableTrack(track)}>{track.label}</button>}</For>}
    </>
  )
}
```
