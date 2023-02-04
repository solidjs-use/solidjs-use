import { createSignal } from 'solid-js'
import { useDateFormat, useNow } from 'solidjs-use'

const Demo = () => {
  const [formatter, setFormatter] = createSignal('YYYY-MM-DD HH:mm:ss')
  const formatted = useDateFormat(useNow(), formatter)

  return (
    <>
      <p class="text-20px font-bold text-primary">{formatted()}</p>
      <div class="flex items-center">
        <span class="mr-5px text-18px">Formatter Editor :</span>
        <input value={formatter()} onInput={e => setFormatter(e.currentTarget.value)} type="text" />
      </div>
    </>
  )
}

export default Demo
