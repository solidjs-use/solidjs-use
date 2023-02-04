import { createMemo } from 'solid-js'
import { useTextDirection } from 'solidjs-use'

const Demo = () => {
  const { dir, setDir } = useTextDirection({
    selector: 'solidjs-usetextdirection-demo'
  })
  const text = createMemo(() =>
    dir() === 'ltr'
      ? 'This paragraph is in English and correctly goes left to right.'
      : 'This paragraph is in English but incorrectly goes right to left.'
  )
  const handleOnClick = () => {
    setDir(dir() === 'rtl' ? 'ltr' : 'rtl')
  }
  return (
    <>
      <div dir={dir()}>
        <p classList={{ 'c-red': dir() === 'rtl' }}>{text()}</p>
        <hr />
        <button onClick={handleOnClick}>
          <span class="ml-2">{dir().toUpperCase()}</span>
        </button>
        <span class="p-4 opacity-50">Click to change the direction</span>
      </div>
    </>
  )
}

export default Demo
