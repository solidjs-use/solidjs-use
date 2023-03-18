import { createMemo, createSignal } from 'solid-js'
import { useFavicon } from 'solidjs-use'

const Demo = () => {
  const [type, setType] = createSignal('solid')

  const favicon = createMemo(() => (type() === 'solid' ? 'solidjs.png' : 'solidjs-use-32x32.png'))
  useFavicon(favicon, {
    baseUrl: window.origin + (process.env.NODE_ENV === 'production' ? '/solidjs-use/' : '/'),
    rel: 'icon'
  })
  return (
    <>
      <div>Change favicon to</div>
      <button onClick={() => setType('solid')}>Solid</button>
      <button onClick={() => setType('solidjs-use')}>solidjs-use</button>
    </>
  )
}

export default Demo
