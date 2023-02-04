import { createSignal } from 'solid-js'
import { useImage } from 'solidjs-use'

const Demo = () => {
  const [imageOptions, setImageOptions] = createSignal({ src: 'https://place.dog/300/200' })
  const { isLoading, error } = useImage(imageOptions, { delay: 2000 })

  const change = () => {
    const time = new Date().getTime()
    setImageOptions({
      src: `https://place.dog/300/200?t=${time}`
    })
  }
  return (
    <>
      {isLoading() ? (
        <div class="w-[300px] h-[200px] animate-pulse bg-gray-500/5 p-2">Loading...</div>
      ) : error() ? (
        <div>Failed</div>
      ) : (
        <img class="w-[300px] h-[200px]" src={imageOptions().src} />
      )}
      <button onClick={change}>Change</button>
    </>
  )
}

export default Demo
