import { useMounted } from '.'

const Demo = () => {
  const isMounted = useMounted()
  return (
    <>
      <div>{isMounted() ? 'mounted' : 'unmounted'}</div>
    </>
  )
}

export default Demo
