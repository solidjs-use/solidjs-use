import { createSignal } from 'solid-js'
import { useBase64 } from 'solidjs-use'
import type { Signal } from 'solid-js'

const Demo = () => {
  const [text, setText] = createSignal('')
  const [file, setFile] = createSignal() as Signal<File>
  const [image, setImage] = createSignal() as Signal<HTMLImageElement>

  const { base64: textBase64 } = useBase64(text)
  const { base64: fileBase64 } = useBase64(file)
  const { base64: imageBase64 } = useBase64(image)
  const { base64: bufferBase64 } = useBase64(new ArrayBuffer(8))

  return (
    <>
      <div space-y-4>
        <div grid md:grid-cols-2 gap-2>
          <div>
            <span>Text Input</span>
            <textarea
              value={text()}
              onInput={event => setText(event.currentTarget.value)}
              h-40
              placeholder="Type something..."
            />
          </div>
          <div>
            <span>Base64</span>
            <textarea h-40 value={textBase64()} readonly />
          </div>
        </div>

        <div grid md:grid-cols-2 gap-2>
          <div>
            <span>Buffer Input</span>
            <pre mt-2>new ArrayBuffer(1024)</pre>
          </div>
          <div>
            <span>Base64</span>
            <textarea h-40 value={bufferBase64()} readonly />
          </div>
        </div>

        <div grid md:grid-cols-2 gap-2>
          <div>
            <span>File Input</span>
            <div>
              <input
                mt-2
                type="file"
                onInput={event => {
                  setFile(() => event.currentTarget.files![0])
                }}
              />
            </div>
          </div>
          <div>
            <span>Base64</span>
            <textarea h-40 value={fileBase64()} readonly />
          </div>
        </div>

        <div grid md:grid-cols-2 gap-2>
          <div>
            <span>Image Input</span>
            <img
              ref={setImage}
              w-full
              h-40
              object-cover
              class="rounded mt-2"
              src="https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
            />
          </div>
          <div>
            <span>Base64</span>
            <textarea h-40 value={imageBase64()} readonly />
          </div>
        </div>
      </div>
      <style>{`textarea {
  min-width: 0 !important;
  width: 100%;
}`}</style>
    </>
  )
}

export default Demo
