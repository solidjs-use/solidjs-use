import { useTextareaAutoSize } from 'solidjs-use'

const Demo = () => {
  const { setTextareaRef, value, onChange } = useTextareaAutoSize()
  return (
    <>
      <div>
        <span>Type, the textarea will grow:</span>
        <textarea
          ref={setTextareaRef}
          value={value() || ''}
          onInput={onChange}
          class="resize-none"
          placeholder="What's on your mind?"
        />
      </div>
    </>
  )
}

export default Demo
