import { stringify } from '@solidjs-use/docs-utils'
import { AiOutlineCheck } from 'solid-icons/ai'
import { BiRegularTachometer } from 'solid-icons/bi'
import { BsPip, BsSpeedometer } from 'solid-icons/bs'
import { FaSolidVolumeXmark } from 'solid-icons/fa'
import { FiPlay, FiRepeat, FiSettings, FiVolume2 } from 'solid-icons/fi'
import { RiMediaClosedCaptioningLine } from 'solid-icons/ri'
import { TbPlayerPause } from 'solid-icons/tb'
import { createMemo, createSignal, For, Show } from 'solid-js'
import { useMediaControls } from 'solidjs-use'
import { Menu } from './components/Menu'
import { MenuItem } from './components/MenuItem'
import { Scrubber } from './components/Scrubber'
import { Spinner } from './components/Spinner'

const Demo = () => {
  const [video, setVideo] = createSignal<HTMLVideoElement>()
  const [loop, setLoop] = createSignal(false)
  const poster = 'https://cdn.bitmovin.com/content/assets/sintel/poster.png'
  const controls = useMediaControls(video, {
    src: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Sintel_movie_4K.webm',
      type: 'video/webm'
    },
    tracks: [
      {
        default: true,
        src: 'https://gist.githubusercontent.com/wheatjs/a85a65a82d87d7c098e1a0972ef1f726/raw',
        kind: 'subtitles',
        label: 'English',
        srcLang: 'en'
      },
      {
        src: 'https://gist.githubusercontent.com/wheatjs/38f32925d20c683bf77ba33ff737891b/raw',
        kind: 'subtitles',
        label: 'French',
        srcLang: 'fr'
      }
    ]
  })

  const {
    playing,
    setPlaying,
    buffered,
    currentTime,
    setCurrentTime,
    duration,
    tracks,
    waiting,
    setRate,
    selectedTrack,
    volume,
    setVolume,
    muted,
    setMuted,
    isPictureInPicture,
    supportsPictureInPicture,
    togglePictureInPicture,
    enableTrack,
    disableTrack
  } = controls
  const endBuffer = createMemo(() => (buffered().length > 0 ? buffered()[buffered().length - 1][1] : 0))
  const formatDuration = (seconds: number) => new Date(1000 * seconds).toISOString().slice(14, 19)
  return (
    <>
      <div
        class="outline-none"
        tabIndex={0}
        onKeyDown={e => {
          if (e.code === 'Space') {
            e.preventDefault()
            setPlaying(!playing())
          } else if (e.code === 'ArrowRight') {
            setCurrentTime(currentTime() + 10)
          } else if (e.code === 'ArrowLeft') {
            setCurrentTime(currentTime() - 10)
          }
        }}
      >
        <div class="mt-5 relative bg rounded-md shadow overflow-hidden">
          <video
            ref={setVideo}
            crossorigin="anonymous"
            class="w-full block"
            poster={poster}
            loop={loop()}
            onClick={() => setPlaying(state => !state)}
          />
          <Show when={waiting()}>
            <div class="absolute inset-0 grid place-items-center pointer-events-none bg bg-opacity-20">
              <Spinner />
            </div>
          </Show>
        </div>

        <Scrubber
          value={currentTime()}
          updateValue={setCurrentTime}
          max={duration()}
          secondary={endBuffer()}
          class="mt-2"
        >
          {(pendingValue, position) => (
            <div
              style={{ left: position }}
              class="absolute transform -translate-x-1/2 bg rounded px-2 bottom-0 mb-4 py-1 text-xs text-white"
            >
              {formatDuration(pendingValue)}
            </div>
          )}
        </Scrubber>
        <div class="flex flex-row items-center items-center">
          <button onClick={() => setPlaying(state => !state)}>
            <Show when={!playing()} fallback={<TbPlayerPause class="inline-block align-middle" />}>
              <FiPlay class="inline-block align-middle" />
            </Show>
          </button>
          <button onClick={() => setMuted(s => !s)}>
            <Show when={muted()} fallback={<FiVolume2 class="inline-block align-middle" />}>
              <FaSolidVolumeXmark class="inline-block align-middle" />
            </Show>
          </button>
          <Scrubber value={volume()} updateValue={setVolume} max={1} class="w-32 ml-2" />
          <div class="flex flex-col flex-1 text-sm ml-2">
            {formatDuration(currentTime())} / {formatDuration(duration())}
          </div>
          <Menu
            class="mr-2"
            menuContent={(isOpen, close) => (
              <div class="absolute bottom-0 right-0 bg rounded py-2 shadow">
                <MenuItem
                  onClick={() => {
                    disableTrack()
                    close()
                  }}
                >
                  <span class="flex-1">Off</span>
                  <AiOutlineCheck
                    class="inline-block align-middle"
                    classList={{ 'opacity-0': selectedTrack() !== -1 }}
                  />
                </MenuItem>
                <For each={tracks()}>
                  {track => (
                    <MenuItem
                      onClick={() => {
                        enableTrack(track)
                        close()
                      }}
                    >
                      <span class="flex-1">{track.label}</span>
                      <AiOutlineCheck
                        class="inline-block align-middle"
                        classList={{ 'opacity-0': track.mode !== 'showing' }}
                      />
                    </MenuItem>
                  )}
                </For>
              </div>
            )}
          >
            {open => (
              <button onClick={open}>
                <RiMediaClosedCaptioningLine class="inline-block align-middle" />
              </button>
            )}
          </Menu>

          <Menu
            class="mr-2"
            menuContent={(isOpen, close) => (
              <div class="absolute bottom-0 right-0 shadow py-2 bg rounded">
                <Show when={!!supportsPictureInPicture}>
                  <MenuItem
                    onClick={() => {
                      togglePictureInPicture()
                      close()
                    }}
                  >
                    <BsPip />
                    <span class="flex-1">{isPictureInPicture() ? 'Exit' : 'Enter'} Picture in Picture</span>
                  </MenuItem>
                </Show>
                <MenuItem
                  onClick={() => {
                    setLoop(s => !s)
                    close()
                  }}
                >
                  <FiRepeat />
                  <span class="flex-1">Loop</span>
                  <Show when={loop()}>
                    <AiOutlineCheck />
                  </Show>
                </MenuItem>
              </div>
            )}
          >
            {open => (
              <button class="block" onClick={open}>
                <FiSettings class="inline-block align-middle" />
              </button>
            )}
          </Menu>

          <Menu
            menuContent={(isOpen, close) => (
              <div class="absolute bottom-0 right-0 shadow py-2 bg rounded">
                <MenuItem
                  onClick={() => {
                    setRate(2)
                    close()
                  }}
                >
                  <BiRegularTachometer />
                  2x
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setRate(1)
                    close()
                  }}
                >
                  <BiRegularTachometer />
                  1x
                </MenuItem>
              </div>
            )}
          >
            {open => (
              <button class="block" onClick={open}>
                <BsSpeedometer class="inline-block align-middle" />
              </button>
            )}
          </Menu>
        </div>
        <pre class="code-block" lang="yaml">
          {stringify({
            playing,
            buffered,
            currentTime,
            duration,
            tracks,
            waiting,
            selectedTrack,
            volume,
            muted,
            isPictureInPicture,
            supportsPictureInPicture,
            loop
          })}
        </pre>
      </div>
    </>
  )
}

export default Demo
