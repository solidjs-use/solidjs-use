import { createSignal } from 'solid-js'
import { useCssVar } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal(null)
  const [color, setColor] = useCssVar('--color', el)
  const switchColor = () => {
    if (color() === '#df8543') {
      setColor('#7fa998')
    } else {
      setColor('#df8543')
    }
  }

  const [elv, setElv] = createSignal(null)
  const [key, setKey] = createSignal('--color')
  const [colorVal] = useCssVar(key, elv)
  const changeVar = () => {
    if (key() === '--color') setKey('--color-one')
    else setKey('--color')
  }
  return (
    <>
      <div ref={setEl} style="--color: #7fa998; color: var(--color)">
        Sample text, {color()}
      </div>
      <button onClick={switchColor}>Change Color</button>
      <div ref={setElv} style={{ '--color': '#7fa998', '--color-one': '#df8543', color: colorVal() }}>
        Sample text, {key()}: {colorVal()}
      </div>
      <button style={{ 'margin-left': 0 }} onClick={changeVar}>
        Change Color Variable
      </button>
    </>
  )
}

export default Demo
