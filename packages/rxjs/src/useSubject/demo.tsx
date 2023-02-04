import { useSubject } from '@solidjs-use/rxjs'
import { BehaviorSubject } from 'rxjs'
import { createEffect, getOwner, on, onCleanup, onMount, runWithOwner } from 'solid-js'

const Demo = () => {
  const countSubject = new BehaviorSubject(0)
  const [count, setCount] = useSubject(countSubject)

  const owner = getOwner()!
  onMount(() => {
    runWithOwner(owner, () => {})
    createEffect(
      on(count, value => {
        console.info('from watcher:', value)
      })
    )
    const subscription = countSubject.subscribe(value => console.info('from subscriber: ', value))
    onCleanup(() => {
      subscription.unsubscribe()
    })
  })

  return (
    <>
      <button onClick={() => setCount(state => state + 1)}>count is: {count()}</button>
    </>
  )
}

export default Demo
