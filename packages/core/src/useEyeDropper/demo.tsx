import { useEyeDropper } from 'solidjs-use'

const Demo = () => {
  const { isSupported, open, sRGBHex } = useEyeDropper()

  return (
    <>
      {isSupported() ? (
        <div>
          <div>isSupported: {isSupported().toString()}</div>
          <div>
            sRGBHex: <span style={{ color: sRGBHex() }}>{sRGBHex()}</span>
          </div>
          <button onClick={() => open()}>Open Eye Dropper</button>
        </div>
      ) : (
        <div>
          <span>Not Supported by Your Browser</span>
        </div>
      )}
    </>
  )
}

export default Demo
