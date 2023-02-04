import { stringify } from '@solidjs-use/docs-utils'
import { useStorage } from 'solidjs-use'

const Demo = () => {
  const theDefault = {
    name: 'Banana',
    color: 'Yellow',
    size: 'Medium',
    count: 0
  }
  const [state, setState] = useStorage('vue-use-local-storage', theDefault)
  const [state2] = useStorage('vue-use-local-storage', theDefault)

  return (
    <>
      <div>
        <input value={state().name} onInput={e => setState({ ...state(), name: e.currentTarget.value })} type="text" />
        <input
          value={state().color}
          onInput={e => setState({ ...state(), color: e.currentTarget.value })}
          type="text"
        />
        <input value={state().size} onInput={e => setState({ ...state(), size: e.currentTarget.value })} type="text" />
        <input
          value={state().count}
          onInput={e => setState({ ...state(), count: Number(e.currentTarget.value) })}
          type="range"
          min="0"
          step="0.01"
          max="1000"
        />

        <pre lang="json">{stringify(state2())}</pre>
      </div>
    </>
  )
}

export default Demo
