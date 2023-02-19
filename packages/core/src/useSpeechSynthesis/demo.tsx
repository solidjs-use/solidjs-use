import { FaSolidAngleDown } from 'solid-icons/fa'
import { TbLanguageHiragana } from 'solid-icons/tb'
import { createSignal, For, onMount, Show } from 'solid-js'
import { useSpeechSynthesis } from 'solidjs-use'

const Demo = () => {
  const [voice, setVoice] = createSignal<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)
  const [text, setText] = createSignal('Hello, everyone! Good morning!')

  const speech = useSpeechSynthesis(text, {
    voice
  })

  let synth: SpeechSynthesis

  const [voices, setVoices] = createSignal<SpeechSynthesisVoice[]>([])

  onMount(() => {
    if (speech.isSupported()) {
      // load at last
      setTimeout(() => {
        synth = window.speechSynthesis
        setVoices(synth.getVoices())
        setVoice(voices()[0])
      })
    }
  })

  const play = () => {
    if (speech.status() === 'pause') {
      console.log('resume')
      window.speechSynthesis.resume()
    } else {
      speech.speak()
    }
  }

  const pause = () => {
    window.speechSynthesis.pause()
  }

  const stop = () => {
    speech.stop()
  }

  return (
    <>
      <div>
        <Show
          when={!speech.isSupported()}
          fallback={
            <div>
              <label class="font-bold mr-2">Spoken Text</label>
              <input value={text()} onInput={e => setText(e.currentTarget.value)} class="!inline-block" type="text" />

              <br />
              <label class="font-bold mr-2">Language</label>
              <div bg="$vp-c-bg" border="$vp-c-divider-light 1" inline-flex items-center relative rounded>
                <TbLanguageHiragana class="absolute left-2 opacity-80 pointer-events-none" />
                <select
                  value={voice()?.name}
                  onChange={e =>
                    setVoice(
                      voices().find(item => item.name === e.currentTarget.value) as unknown as SpeechSynthesisVoice
                    )
                  }
                  px-8
                  border-0
                  bg-transparent
                  h-9
                  rounded
                  appearance-none
                >
                  <option bg="$vp-c-bg" disabled>
                    Select Language
                  </option>
                  <For each={voices()}>
                    {voice => (
                      <option bg="$vp-c-bg" value={voice.name}>
                        {`${voice.name} (${voice.lang})`}
                      </option>
                    )}
                  </For>
                </select>
                <FaSolidAngleDown class="absolute right-2 opacity-80 pointer-events-none" />
              </div>

              <div class="mt-2">
                <button disabled={speech.isPlaying()} onClick={play}>
                  {speech.status() === 'pause' ? 'Resume' : 'Speak'}
                </button>
                <button disabled={!speech.isPlaying()} class="orange" onClick={pause}>
                  Pause
                </button>
                <button disabled={!speech.isPlaying()} class="red" onClick={stop}>
                  Stop
                </button>
              </div>
            </div>
          }
        >
          <div>
            Your browser does not support SpeechSynthesis API,
            <a href="https://caniuse.com/mdn-api_speechsynthesis" target="_blank">
              more details
            </a>
          </div>
        </Show>
      </div>
    </>
  )
}

export default Demo
