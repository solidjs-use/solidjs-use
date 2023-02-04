import { createSignal } from 'solid-js'
import { onClickOutside } from 'solidjs-use'

const Demo = () => {
  const [modal, setModal] = createSignal(false)
  const [modalRef, setModalRef] = createSignal(null)

  onClickOutside(modalRef, event => {
    console.log(event)
    setModal(false)
  })

  return (
    <>
      <button onClick={() => setModal(true)}>Open Modal</button>
      {modal() && (
        <div class="modal" ref={setModalRef}>
          <div class="inner">
            <button class="button small" title="Close" onClick={() => setModal(false)}>
              𝖷
            </button>
            <p class="heading">Demo Modal</p>
            <p>Click outside of the modal to close it.</p>
          </div>
        </div>
      )}
      <style>
        {`.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  max-width: 100%;
  z-index: 10;
}
.inner {
  background-color: var(--vp-c-bg);
  padding: 0.4em 2em;
  border-radius: 5px;
  border: 1px solid var(--vp-c-divider-light);
  box-shadow: 2px 2px 10px rgba(10, 10, 10, 0.1);
}
.dropdown-inner {
  background-color: var(--vp-c-bg);
  padding: 0.5em;
  position: absolute;
  left: 0;
  z-index: 10;
  border-radius: 5px;
  border: 1px solid var(--vp-c-divider-light);
  box-shadow: 2px 2px 5px rgba(10, 10, 10, 0.1);
}
.heading {
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: 2rem;
}
.button {
  position: absolute;
  top: -0.9rem;
  right: -0.5rem;
  font-weight: bold;
}`}
      </style>
    </>
  )
}

export default Demo
