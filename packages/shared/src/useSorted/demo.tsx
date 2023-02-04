import { createMemo, createSignal } from 'solid-js'
import { rand, useSorted } from 'solidjs-use'

const Demo = () => {
  const objArr = [
    {
      name: 'John',
      age: 40
    },
    {
      name: 'Jane',
      age: 20
    },
    {
      name: 'Joe',
      age: 30
    },
    {
      name: 'Jenny',
      age: 22
    }
  ]
  const result2 = useSorted(objArr, (a, b) => a.age - b.age)
  const [arrText, setArrText] = createSignal('')
  const inputArr = createMemo(() => arrText().split(','))
  const inputOut = useSorted(inputArr)

  function randomArr() {
    const arr: number[] = []
    for (let i = 0; i < rand(10, 20); i++) arr.push(rand(0, 100))
    setArrText(arr.join(','))
  }

  randomArr()
  return (
    <>
      <div>
        <div class="flex items-center">
          input:&nbsp;
          <input value={arrText()} onInput={e => setArrText(e.currentTarget.value)} type="text" />
        </div>
        <div>
          <button onClick={randomArr}>random</button>
        </div>
        output: {inputOut().toString()}
      </div>

      <div class="mt-10">
        <div>object property sort:</div>
        <div>input:</div>
        <div>{JSON.stringify(objArr)}</div>
        <div class="mt-5">output:</div>
        <div>{JSON.stringify(result2())}</div>
      </div>
    </>
  )
}

export default Demo
