import { useCloned } from 'solidjs-use'

const Demo = () => {
  const { cloned, setCloned, sync } = useCloned({ fruit: 'banana', drink: 'water' })

  return (
    <>
      <div>
        <input
          value={cloned().fruit}
          onInput={e => setCloned(state => ({ ...state, fruit: e.currentTarget.value }))}
          type="text"
        />
        <input
          value={cloned().drink}
          onInput={e => setCloned(state => ({ ...state, drink: e.currentTarget.value }))}
          type="text"
        />

        <button onClick={() => sync()}>reset</button>
      </div>
    </>
  )
}

export default Demo
