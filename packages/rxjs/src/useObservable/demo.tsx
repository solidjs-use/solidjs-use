import { Note } from '@solidjs-use/docs-components'
import { useObservable } from '@solidjs-use/rxjs'
import { interval } from 'rxjs'
import { mapTo, scan, startWith } from 'rxjs/operators'

const Demo = () => {
  const [count] = useObservable(
    interval(1000).pipe(
      mapTo(1),
      startWith(0),
      scan((total, next) => next + total)
    )
  )

  return (
    <>
      <Note>Update every 1s</Note>
      <p>Counter: {count()}</p>
    </>
  )
}

export default Demo
