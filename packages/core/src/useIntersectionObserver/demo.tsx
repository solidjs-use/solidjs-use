import { BooleanDisplay } from '@solidjs-use/docs-components'
import { createSignal } from 'solid-js'
import { useIntersectionObserver } from 'solidjs-use'

const Demo = () => {
  const [root, setRoot] = createSignal(null)
  const [target, setTarget] = createSignal(null)
  const [isVisible, setIsVisible] = createSignal(false)

  useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      setIsVisible(isIntersecting)
    },
    { root }
  )
  return (
    <>
      <div ref={setRoot} class="root">
        <p class="notice">Scroll me down!</p>
        <div ref={setTarget} class="target">
          <p>Hello world!</p>
        </div>
      </div>
      <div class="text-center">
        Element&nbsp;
        <BooleanDisplay value={isVisible()} true="inside" false="outside" class="font-bold" />
        &nbsp;the viewport
      </div>
      <style>
        {`
.root {
  border: 2px dashed #ccc;
  height: 200px;
  margin: 0 2rem 1rem;
  overflow-y: scroll;
}
.notice {
  text-align: center;
  padding: 2em 0;
  margin-bottom: 300px;
  font-style: italic;
  font-size: 1.2rem;
  opacity: 0.8;
}
.target {
  border: 2px dashed var(--hope-colors-primary11);
  padding: 10px;
  max-height: 150px;
  margin: 0 2rem 400px;
}`}
      </style>
    </>
  )
}

export default Demo
