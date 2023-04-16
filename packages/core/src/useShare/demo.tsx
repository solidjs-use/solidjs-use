import { createSignal, Show } from 'solid-js'
import { isClient, useShare } from 'solidjs-use'

const Demo = () => {
  const [options, setOptions] = createSignal({
    title: 'solidjs-use',
    text: 'Collection of SolidJS utilities inspired completely by VueUse!',
    url: isClient ? location.href : ''
  })

  const { share, isSupported } = useShare(options)

  const startShare = () => share()?.catch(err => err)
  return (
    <>
      <div>
        <Show when={isSupported()}>
          <input
            type="text"
            w="30vw"
            placeholder="Note"
            value={options().text}
            onInput={e => {
              setOptions(options => ({
                ...options,
                text: e.currentTarget.value
              }))
            }}
          />
        </Show>
        <button disabled={!isSupported()} onClick={startShare}>
          {isSupported() ? 'Share' : 'Web share is not supported in your browser'}
        </button>
      </div>
    </>
  )
}

export default Demo
