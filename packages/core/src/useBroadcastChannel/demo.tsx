import { createEffect, createSignal, Show } from 'solid-js'
import { useBroadcastChannel } from 'solidjs-use'

const Demo = () => {
  const { isSupported, data, post, error } = useBroadcastChannel({ name: 'solidjs-use-demo-channel' })

  const [message, setMessage] = createSignal('')

  createEffect(() => {
    if (data()) {
      alert(data())
    }
  })

  return (
    <>
      <div>
        <div>
          <p>
            Supported:
            <b>{isSupported()}</b>
          </p>

          <p>Please open this page in at least two tabs</p>
        </div>
        <Show when={isSupported()}>
          <div>
            <form
              onSubmit={event => {
                event.preventDefault()
                post(message())
              }}
            >
              <input value={message()} onInput={event => setMessage(event.currentTarget.value)} type="text" />
              <button type="submit">Send Message</button>
            </form>
            <Show when={!!data()}>
              <p>received: {String(data())}</p>
            </Show>
            <Show when={!!error()}>
              <p>error: {String(error())}</p>
            </Show>
          </div>
        </Show>
      </div>
    </>
  )
}

export default Demo
