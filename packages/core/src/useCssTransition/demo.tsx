import { createSignal } from 'solid-js'
import { rand, TransitionPresets, useCssTransition } from 'solidjs-use'

const Demo = () => {
  const duration = 1500

  const [baseNumber, setBaseNumber] = createSignal(0)

  const [baseVector, setBaseVector] = createSignal([0, 0])

  const easeOutElastic = (n: number) => {
    return n === 0 ? 0 : n === 1 ? 1 : 2 ** (-10 * n) * Math.sin((n * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1
  }

  const cubicBezierNumber = useCssTransition(baseNumber, {
    duration,
    transition: [0.75, 0, 0.25, 1]
  })

  const customFnNumber = useCssTransition(baseNumber, {
    duration,
    transition: () => easeOutElastic
  })

  const vector = useCssTransition(baseVector, {
    duration,
    transition: TransitionPresets.easeOutExpo
  })

  const toggle = () => {
    setBaseNumber(state => (state === 100 ? 0 : 100))
    setBaseVector([rand(0, 100), rand(0, 100)])
  }
  return (
    <>
      <div>
        <button onClick={() => toggle()}>Transition</button>
        <p class="mt-2">
          Cubic bezier curve: <b>{cubicBezierNumber().toFixed(2)}</b>
        </p>

        <div class="track number">
          <div class="relative">
            <div class="sled" style={{ left: `${cubicBezierNumber()}%` }} />
          </div>
        </div>

        <p class="mt-2">
          Custom function: <b>{customFnNumber().toFixed(2)}</b>
        </p>

        <div class="track number">
          <div class="relative">
            <div class="sled" style={{ left: `${customFnNumber()}%` }} />
          </div>
        </div>

        <p class="mt-2">
          Vector:{' '}
          <b>
            [{vector()[0].toFixed(2)}, {vector()[1].toFixed(2)}]
          </b>
        </p>

        <div class="track vector">
          <div class="relative">
            <div class="sled" style={{ left: `${vector()[0]}%`, top: `${vector()[1]}%` }} />
          </div>
        </div>
      </div>
      <style>
        {`
.track {
  background: rgba(125, 125, 125, 0.3);
  border-radius: 0.5rem;
  max-width: 20rem;
  width: 100%;
}

.sled {
  background: var(--hope-colors-primary9);
  border-radius: 50%;
  height: 1rem;
  position: absolute;
  width: 1rem;
}

.number.track {
  height: 1rem;
  margin: 0.5rem 0;
  padding: 0 0.5rem;
}

.number.track .sled {
  transform: translateX(-50%);
}

.vector.track {
  padding: 0.5rem;
}

.vector.track .relative {
  padding-bottom: 30%;
}

.vector.track .sled {
  transform: translateX(-50%) translateY(-50%);
}`}
      </style>
    </>
  )
}

export default Demo
