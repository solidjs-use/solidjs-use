import { stringify } from '@solidjs-use/docs-utils'
import { useIDBKeyval } from '@solidjs-use/integrations/useIDBKeyval'

const Demo = () => {
  const KEY = 'vue-use-idb-keyval'
  const [stateObject, setStateObject] = useIDBKeyval(`${KEY}-object`, {
    name: 'Banana',
    color: 'Yellow',
    size: 'Medium',
    count: 0
  })
  const [stateString, setStateString] = useIDBKeyval(`${KEY}-string`, 'foobar')
  const [stateArray, setStateArray] = useIDBKeyval(`${KEY}-array`, ['foo', 'bar', 'baz'])
  return (
    <>
      <h5>Object</h5>
      <input
        value={stateObject().name}
        onInput={e => setStateObject({ ...stateObject(), name: e.currentTarget.value })}
        type="text"
      />
      <input
        value={stateObject().color}
        onInput={e => setStateObject({ ...stateObject(), color: e.currentTarget.value })}
        type="text"
      />
      <input
        value={stateObject().size}
        onInput={e => setStateObject({ ...stateObject(), size: e.currentTarget.value })}
        type="text"
      />
      <input
        value={stateObject().count}
        onInput={e => setStateObject({ ...stateObject(), count: Number(e.currentTarget.value) })}
        type="range"
      />
      <pre lang="json">{stringify(stateObject())}</pre>
      <br />

      <h5>String</h5>
      <input value={stateString()} onInput={e => setStateString(e.currentTarget.value)} type="text" />
      <pre>{stateString()}</pre>
      <br />

      <h5>Array</h5>
      <input
        value={stateArray()?.[0]}
        onInput={e => setStateArray([e.currentTarget.value, stateArray()[1], stateArray()[2]])}
        type="text"
      />
      <input
        value={stateArray()?.[1]}
        onInput={e => setStateArray([stateArray()[0], e.currentTarget.value, stateArray()[2]])}
        type="text"
      />
      <input
        value={stateArray()?.[2]}
        onInput={e => setStateArray([stateArray()[0], stateArray()[1], e.currentTarget.value])}
        type="text"
      />
      <pre lang="json">{stringify(stateArray())}</pre>
    </>
  )
}

export default Demo
