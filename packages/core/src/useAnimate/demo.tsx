import { stringify } from '@solidjs-use/docs-utils'
import { createSignal } from 'solid-js'
import { useAnimate } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement>()
  const {
    play,
    pause,
    reverse,
    finish,
    cancel,
    startTime,
    currentTime,
    playbackRate,
    playState,
    replaceState,
    pending
  } = useAnimate(
    el,
    [
      { clipPath: 'circle(20% at 0% 30%)' },
      { clipPath: 'circle(20% at 50% 80%)' },
      { clipPath: 'circle(20% at 100% 30%)' }
    ],
    {
      duration: 3000,
      iterations: 5,
      direction: 'alternate',
      easing: 'cubic-bezier(0.46, 0.03, 0.52, 0.96)'
    }
  )

  return (
    <div>
      <div class="flex items-center justify-center w-full h-60">
        <p ref={setEl} class="text-5xl! text-$vp-c-brand font-800">
          SolidJS-USE useAnimate
        </p>
      </div>
      <div>
        <button v-if="playState === 'running'" onClick={pause}>
          pause
        </button>
        <button v-else onClick={play}>
          play
        </button>
        <button onClick={reverse}>reverse</button>
        <button onClick={finish}>finish</button>
        <button onClick={cancel}>cancel</button>
      </div>
      <pre class="code-block">
        {stringify({
          startTime,
          currentTime,
          playbackRate,
          playState,
          replaceState,
          pending
        })}
      </pre>
    </div>
  )
}

export default Demo
