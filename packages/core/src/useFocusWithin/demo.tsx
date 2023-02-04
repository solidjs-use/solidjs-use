import { BooleanDisplay } from '@solidjs-use/docs-components'
import { createSignal } from 'solid-js'
import { useFocusWithin } from 'solidjs-use'

const Demo = () => {
  const [target, setTarget] = createSignal<HTMLElement>()
  const focused = useFocusWithin(target)
  return (
    <>
      <div class="flex flex-col items-center">
        <form ref={setTarget} class="shadow bg border-main rounded max-w-96 mx-auto p-8">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Password" />
        </form>
        <div mt2>
          Focus in form: <BooleanDisplay value={focused()} />
        </div>
      </div>
    </>
  )
}

export default Demo
