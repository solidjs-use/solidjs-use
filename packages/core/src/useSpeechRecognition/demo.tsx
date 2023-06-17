import { Note } from '@solidjs-use/docs-components'
import { createEffect, createSignal, Match, on, Show, Switch } from 'solid-js'
import { useSpeechRecognition } from 'solidjs-use'

const Demo = () => {
  const [lang, setLang] = createSignal('en-US')

  function sample<T> (arr: T[], size: number) {
    const shuffled = arr.slice(0)
    let i = arr.length
    let temp: T
    let index: number
    while (i--) {
      index = Math.floor((i + 1) * Math.random())
      temp = shuffled[index]
      shuffled[index] = shuffled[i]
      shuffled[i] = temp
    }
    return shuffled.slice(0, size)
  }

  const colors = [
    'aqua',
    'azure',
    'beige',
    'bisque',
    'black',
    'blue',
    'brown',
    'chocolate',
    'coral',
    'crimson',
    'cyan',
    'fuchsia',
    'ghostwhite',
    'gold',
    'goldenrod',
    'gray',
    'green',
    'indigo',
    'ivory',
    'khaki',
    'lavender',
    'lime',
    'linen',
    'magenta',
    'maroon',
    'moccasin',
    'navy',
    'olive',
    'orange',
    'orchid',
    'peru',
    'pink',
    'plum',
    'purple',
    'red',
    'salmon',
    'sienna',
    'silver',
    'snow',
    'tan',
    'teal',
    'thistle',
    'tomato',
    'turquoise',
    'violet',
    'white',
    'yellow',
    'transparent'
  ]
  const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')} ;`

  const speech = useSpeechRecognition({
    lang,
    continuous: true
  })

  const [color, setColor] = createSignal('transparent')

  if (speech.isSupported()) {
    // @ts-expect-error missing types
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    const speechRecognitionList = new SpeechGrammarList()
    speechRecognitionList.addFromString(grammar, 1)
    speech.recognition!.grammars = speechRecognitionList

    createEffect(
      on(
        speech.result,
        () => {
          for (const i of speech.result().toLowerCase().split(' ').reverse()) {
            if (colors.includes(i)) {
              setColor(i)
              break
            }
          }
        },
        { defer: true }
      )
    )
  }

  const [sampled, setSampled] = createSignal<string[]>([])

  const start = () => {
    setColor('transparent')
    speech.setResult('')
    setSampled(sample(colors, 5))
    speech.start()
  }

  const { isListening, isSupported, stop, result } = speech

  const [selectedLanguage, setSelectedLanguage] = createSignal(lang())
  createEffect(
    on(
      lang,
      lang => {
        if (isListening()) {
          setSelectedLanguage(lang)
        }
      },
      { defer: true }
    )
  )
  createEffect(
    on(
      isListening,
      isListening => {
        if (isListening) {
          setSelectedLanguage(lang())
        }
      },
      { defer: true }
    )
  )

  return (
    <>
      <div>
        <Show
          when={isSupported()}
          fallback={
            <div>
              Your browser does not support SpeechRecognition API,
              <a href="https://caniuse.com/mdn-api_speechrecognition" target="_blank">
                more details
              </a>
            </div>
          }
        >
          <div>
            <div space-x-4>
              <label>
                <input value={lang()} checked={lang() === 'en-US'} onChange={() => setLang('en-US')} type="radio" />
                &nbsp;<span>English (US)</span>
              </label>
              <label>
                <input value={lang()} checked={lang() === 'fr'} onChange={() => setLang('fr')} type="radio" />
                &nbsp;<span>French</span>
              </label>
              <label>
                <input value={lang()} checked={lang() === 'es'} onChange={() => setLang('es')} type="radio" />
                &nbsp;<span>Spanish</span>
              </label>
            </div>
            <Show when={isListening()} fallback={<button onClick={start}>Press and talk</button>}>
              <button class="orange" onClick={stop}>
                Stop
              </button>
              <div class="mt-4">
                <Switch>
                  <Match when={selectedLanguage() === 'en-US'}>
                    <Note class="mt-2">
                      <b>Please say a color</b>
                    </Note>
                    <Note class="mt-2">try: {sampled().join(', ')}</Note>
                  </Match>
                  <Match when={selectedLanguage() === 'es'}>
                    <p>Speak some Spanish!</p>
                  </Match>
                  <Match when={selectedLanguage() === 'es'}>
                    <p>Speak some French!</p>
                  </Match>
                </Switch>
                <p class="tag" style={selectedLanguage() === 'en-US' ? { background: color() } : {}}>
                  {result()}
                </p>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </>
  )
}

export default Demo
