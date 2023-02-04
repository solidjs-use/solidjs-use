import { createSignal, onError, Show } from 'solid-js'
import type { ParentComponent } from 'solid-js'

export const DemoContainer: ParentComponent = props => {
  const [error, setError] = createSignal<Error | undefined>()

  onError(setError)

  return (
    <div class="demo wide">
      {props.children}
      <Show when={!!error()}>
        <div class="error">{String(error())}</div>
      </Show>
    </div>
  )
}
