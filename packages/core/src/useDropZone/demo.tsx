import { BooleanDisplay } from '@solidjs-use/docs-components'
import { createSignal, For } from 'solid-js'
import { useDropZone } from 'solidjs-use'

const Demo = () => {
  const [filesData, setFilesData] = createSignal<
    Array<{ name: string; size: number; type: string; lastModified: number }>
  >([])
  function onDrop(files: File[] | null) {
    setFilesData([])
    if (files) {
      setFilesData(
        files.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        }))
      )
    }
  }

  const [dropZone, setDropZone] = createSignal<HTMLElement>()

  const { isOverDropZone } = useDropZone(dropZone, onDrop)
  return (
    <>
      <div class="flex">
        <div class="w-full h-auto relative">
          <p>Drop files into dropZone</p>
          <img src="/favicon.ico" alt="Drop me" />
          <div
            ref={setDropZone}
            class="flex flex-col w-full min-h-200px h-auto bg-gray-400/10 justify-center items-center pt-6"
          >
            <div>
              isOverDropZone: <BooleanDisplay value={isOverDropZone()} />
            </div>
            <div class="flex flex-wrap justify-center items-center">
              <For each={filesData()}>
                {file => (
                  <div class="w-200px bg-black-200/10 ma-2 pa-6">
                    <p>Name: {file.name}</p>
                    <p>Size: {file.size}</p>
                    <p>Type: {file.type}</p>
                    <p>Last modified: {file.lastModified}</p>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Demo
