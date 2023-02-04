import { Show } from 'solid-js'
import { mount } from '@dream2023/cypress-solidjs'
import { useToggle } from '@solidjs-use/shared'

export function mountWithUnmount<V>(setup: () => V) {
  const Demo = () => {
    setup()
    return <div>demo</div>
  }
  const App = () => {
    const [bool, toggle] = useToggle(true)
    return (
      <div>
        <Show when={bool()}>
          <Demo />
        </Show>
        <button id="toggle-btn" onClick={() => toggle()}>
          toggle
        </button>
      </div>
    )
  }
  mount(() => <App />)

  return (cb?: () => void) =>
    cy
      .get('#toggle-btn')
      .click()
      .then(() => cb?.())
}
