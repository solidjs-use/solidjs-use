import { For } from 'solid-js'
import { useUrlSearchParams } from 'solidjs-use'

const Demo = () => {
  const [params, setParams] = useUrlSearchParams('history')

  setParams({
    foo: 'bar',
    'solidjs-use': 'awesome'
  })

  return (
    <>
      <div>
        <ul class="!m-0">
          <For each={Object.keys(params())}>
            {key => (
              <li>
                {key} = {params()[key]}
              </li>
            )}
          </For>
        </ul>
      </div>
    </>
  )
}

export default Demo
