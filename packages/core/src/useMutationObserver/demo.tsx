import { createSignal, For } from 'solid-js'
import { useMutationObserver } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal(null)
  const [messages, setMessage] = createSignal<string[]>([])
  const [className, setClassName] = createSignal({})
  const [style, setStyle] = createSignal({})

  useMutationObserver(
    el,
    mutations => {
      const mutation = mutations[0]

      if (!mutation) return

      setMessage(state => [...state, mutation.attributeName!])
    },
    { attributes: true }
  )

  setTimeout(() => {
    setClassName({
      test: true,
      test2: true
    })
  }, 1000)

  setTimeout(() => {
    setStyle({
      color: 'red'
    })
  }, 1550)

  return (
    <>
      <div>
        <div ref={setEl} classList={className()} style={style()}>
          <For each={messages()}>{text => <div>Mutation Attribute: {text}</div>}</For>
        </div>
      </div>
    </>
  )
}

export default Demo
