import { timestamp } from '@solidjs-use/shared'
import { createMemo, createSignal } from 'solid-js'
import { useTimeAgo } from 'solidjs-use'

const Demo = () => {
  const [slider, setSolider] = createSignal(0)
  const value = createMemo(() => timestamp() + slider() ** 3)
  const timeAgo = useTimeAgo(value)

  return (
    <>
      <div>
        <div class="text-primary text-center">{timeAgo}</div>
        <input
          value={slider()}
          onInput={e => setSolider(Number(e.currentTarget.value))}
          class="slider"
          type="range"
          min="-3800"
          max="3800"
        />
        <div class="text-center opacity-50">{slider() ** 3}ms</div>
      </div>
      <style>
        {`
.slider {
  -webkit-appearance: none;
  width: 100%;
  background: rgba(125, 125, 125, 0.1);
  border-radius: 1rem;
  height: 1rem;
  opacity: 0.8;
  margin: 0.5rem 0;
  outline: none !important;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.3rem;
  height: 1.3rem;
  background: var(--hope-colors-primary9);
  cursor: pointer;
  border-radius: 50%;
}`}
      </style>
    </>
  )
}

export default Demo
