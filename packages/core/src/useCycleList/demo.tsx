import { createSignal } from 'solid-js'
import { useCycleList } from 'solidjs-use'

const Demo = () => {
  const [list] = createSignal(['Dog', 'Cat', 'Lizard', 'Shark', 'Whale', 'Dolphin', 'Octopus', 'Seal'])

  const { state, next, prev } = useCycleList(list)

  return (
    <>
      <div>
        <div class="text-primary text-lg font-bold">{state()}</div>
        <button onClick={() => prev()}>Prev</button>
        <button onClick={() => next()}>Next</button>
      </div>
    </>
  )
}

export default Demo
