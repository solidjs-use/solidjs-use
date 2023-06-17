import { Note } from '@solidjs-use/docs-components'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { createMemo, createSignal } from 'solid-js'
import { useDateFormat, useTimestamp, useWebWorkerFn } from 'solidjs-use'

const Demo = () => {
  const heavyTask = () => {
    const randomNumber = () => Math.trunc(Math.random() * 5_000_00)
    const numbers: number[] = Array(5_000_000).fill(undefined).map(randomNumber)
    numbers.sort()
    return numbers.slice(0, 5)
  }

  const { workerFn, workerStatus, workerTerminate } = useWebWorkerFn(heavyTask)
  const [time] = useTimestamp()
  const computedTime = useDateFormat(time, 'YYYY-MM-DD HH:mm:ss SSS')
  const running = createMemo(() => workerStatus() === 'RUNNING')

  const [data, setData] = createSignal<number[] | null>(null)
  const [runner, setRunner] = createSignal('')

  const baseSort = async () => {
    setData(null)
    await nextTick()
    setData(heavyTask())
    setRunner('Main')
  }

  const workerSort = async () => {
    setData(null)
    await nextTick()
    const res = await workerFn()
    setData(res)
    setRunner('Worker')
  }
  return (
    <>
      <p>
        Current Time: <b>{computedTime()}</b>
      </p>
      <Note class="mb-2">
        This is a demo showing sort for large array (5 million numbers) with or w/o WebWorker.
        <br />
        Clock stops when UI blocking happens.
      </Note>
      <button onClick={baseSort}>Sort in Main Thread</button>
      {!running()
        ? (
        <button onClick={workerSort}>Sort in Worker</button>
          )
        : (
        <button class="orange" onClick={() => workerTerminate('PENDING')}>
          Terminate Worker
        </button>
          )}
      {!!data() && (
        <p>
          Thread: <strong>{runner()}</strong>
          <br />
          Result: <strong>{data()}</strong>
        </p>
      )}
    </>
  )
}

export default Demo
