import { Note } from '@solidjs-use/docs-components'
import { useAsyncQueue } from 'solidjs-use'
const Demo = () => {
  const p1 = () => new Promise(resolve => {
    setTimeout(() => {
      resolve(1000)
    }, 10)
  })

  const p2 = (result: number) => new Promise(resolve => {
    setTimeout(() => {
      resolve(1000 + result)
    }, 20)
  })

  const { activeIndex, result } = useAsyncQueue([p1, p2])
  return (
    <>
      <div>
        <Note>activeIndex: {activeIndex()}</Note>
        <Note>result: {JSON.stringify(result)}</Note>
      </div>
    </>
  )
}
export default Demo
