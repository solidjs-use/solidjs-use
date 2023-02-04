import { useCookies } from '@solidjs-use/integrations/useCookies'

const Demo = () => {
  const cookies = useCookies(['locale'])
  return (
    <>
      <div>
        <strong>locale</strong>: {cookies.get('locale')}
        <hr />
        <pre>{cookies.getAll()}</pre>
        <button onClick={() => cookies.set('locale', 'ru-RU')}>Russian</button>
        <button onClick={() => cookies.set('locale', 'en-US')}>English</button>
      </div>
    </>
  )
}

export default Demo
