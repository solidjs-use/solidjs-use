import { Note } from '@solidjs-use/docs-components'
import { useWindowScroll } from 'solidjs-use'

const Demo = () => {
  const { x, y } = useWindowScroll()

  return (
    <>
      <div>
        <div>See scroll values in the lower right corner of the screen.</div>
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '100%',
            width: '10000px',
            height: '10000px'
          }}
        />
        <div class="float">
          <Note class="mb-2">Scroll value</Note>
          <div attr:data-testid="useWindowScroll">
            x: {x().toFixed(1)} <br />
            y: {y().toFixed(1)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Demo
