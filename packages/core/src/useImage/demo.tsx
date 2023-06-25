import { createSignal } from 'solid-js'
import { useImage } from 'solidjs-use'

const Demo = () => {
  const [imageOptions, setImageOptions] = createSignal({ src: 'https://place-hold.it/300x200' })
  const colors = ['fff', '000', '5f0caa']
  const { isLoading, error } = useImage(imageOptions, { delay: 2000 })

  const change = () => {
    const color: string = colors[Math.floor(Math.random() * colors.length)]
    setImageOptions({
      src: `https://place-hold.it/300x200/${color}`
    })
  }
  return (
    <>
      {isLoading()
        ? (
        <div class="w-[300px] h-[200px] animate-pulse bg-gray-500/5 p-2">Loading...</div>
          )
        : error()
          ? (
        <div class="text-red">Failed</div>
            )
          : (
        <img class="w-[300px] h-[200px]" src={imageOptions().src} />
            )}
      <button onClick={change}>Change</button>

      <button onClick={() => setImageOptions({ src: '' })}>Create Error</button>
    </>
  )
}

export default Demo
