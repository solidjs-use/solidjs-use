import { stringify } from '@solidjs-use/docs-utils'
import { createMemo, createSignal } from 'solid-js'
import { useMediaQuery, useParallax } from 'solidjs-use'
import type { JSX } from 'solid-js'

const Demo = () => {
  const [target, setTarget] = createSignal<HTMLElement>()
  const isMobile = useMediaQuery('(max-width: 700px)')

  const parallax = useParallax(target)

  const targetStyle: JSX.CSSProperties = {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'min-height': '500px',
    transition: '.3s ease-out all'
  }
  const cardWindowStyle: JSX.CSSProperties = {
    overflow: 'hidden',
    'font-size': '6rem',
    position: 'absolute',
    top: 'calc(50% - 1em)',
    left: 'calc(50% - 1em)',
    height: '2em',
    width: '2em',
    margin: 'auto'
  }
  const layerBase: JSX.CSSProperties = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    transition: '.3s ease-out all'
  }
  const containerStyle: JSX.CSSProperties = {
    margin: '3em auto',
    perspective: '300px'
  }

  const infoStyle = createMemo<JSX.CSSProperties>(() => ({
    opacity: 0.4,
    top: '20px',
    left: '40px',
    position: isMobile() ? 'inherit' : 'absolute'
  }))

  const layer0 = createMemo<JSX.CSSProperties>(() => ({
    ...layerBase,
    transform: `translateX(${parallax.tilt() * 10}px) translateY(${parallax.roll() * 10}px) scale(1.33)`
  }))

  const layer1 = createMemo<JSX.CSSProperties>(() => ({
    ...layerBase,
    transform: `translateX(${parallax.tilt() * 20}px) translateY(${parallax.roll() * 20}px) scale(1.33)`
  }))

  const layer2 = createMemo<JSX.CSSProperties>(() => ({
    ...layerBase,
    transform: `translateX(${parallax.tilt() * 30}px) translateY(${parallax.roll() * 30}px) scale(1.33)`
  }))

  const layer3 = createMemo<JSX.CSSProperties>(() => ({
    ...layerBase,
    transform: `translateX(${parallax.tilt() * 40}px) translateY(${parallax.roll() * 40}px) scale(1.33)`
  }))

  const layer4 = layerBase

  const cardStyle = createMemo<JSX.CSSProperties>(() => ({
    background: '#fff',
    height: '20rem',
    width: '15rem',
    'border-radius': '5px',
    border: '1px solid #cdcdcd',
    overflow: 'hidden',
    transition: '.3s ease-out all',
    boxShadow: '0 0 20px 0 rgba(255, 255, 255, 0.25)',
    transform: `rotateX(${parallax.roll() * 20}deg) rotateY(${parallax.tilt() * 20}deg)`
  }))
  return (
    <>
      <div>
        <div ref={setTarget} style={targetStyle}>
          <pre style={infoStyle()}>{stringify(parallax)}</pre>
          <div style={containerStyle}>
            <div style={cardStyle()}>
              <div style={cardWindowStyle}>
                <img style={layer0()} src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer0.png" />
                <img style={layer1()} src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer1.png" />
                <img style={layer2()} src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer2.png" />
                <img style={layer3()} src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer3.png" />
                <img style={layer4} src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer4.png" />
              </div>
            </div>
          </div>
          <div class="note opacity-1">
            Credit of images to <a href="https://codepen.io/jaromvogel">Jarom Vogel</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Demo
