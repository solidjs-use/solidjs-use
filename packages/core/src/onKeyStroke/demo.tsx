import { createSignal } from 'solid-js'
import { onKeyStroke } from 'solidjs-use'

const Demo = () => {
  const [translateX, setTranslateX] = createSignal(0)
  const [translateY, setTranslateY] = createSignal(0)

  onKeyStroke(['w', 'W', 'ArrowUp'], () => {
    setTranslateY(v => v - 10)
  })

  onKeyStroke(['s', 'S', 'ArrowDown'], () => {
    setTranslateY(v => v + 10)
  })

  onKeyStroke(['a', 'A', 'ArrowLeft'], () => {
    setTranslateX(v => v - 10)
  })

  onKeyStroke(
    ['d', 'D', 'ArrowRight'],
    () => {
      setTranslateX(v => v + 10)
    },
    { dedupe: true }
  )

  const containerStyle = {
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    width: '100%',
    'max-width': '400px',
    height: '100px',
    margin: 'auto',
    overflow: 'hidden',
    border: '1px solid #a1a1a130',
    'border-radius': '5px'
  }
  const ballStyle = {
    width: '16px',
    height: '16px',
    background: '#a1a1a1',
    'border-radius': '50%'
  }
  return (
    <>
      <div>
        <div class="border-base" style={containerStyle}>
          <div
            style={{
              transform: `translate(${translateX()}px, ${translateY()}px)`,
              ...ballStyle
            }}
          />
        </div>
        <div class="text-center mt-4">
          <p>Use the arrow keys or w a s d keys to control the movement of the ball.</p>
          <p>Repeated events are ignored on the key `d` or `-&gt;`.</p>
        </div>
      </div>
    </>
  )
}

export default Demo
