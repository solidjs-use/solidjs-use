import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { createSignal } from 'solid-js'
import { useObjectUrl } from '.'

describe('useObjectUrl', () => {
  it('should update on value change', () => {
    return runAsyncHook(async () => {
      const [file, setFile] = createSignal<File>()
      const objectUrl = useObjectUrl(file)
      expect(objectUrl()).to.eq('')

      const fd = new File(['xx'], 'x.txt', { type: 'plain/text' })
      const fd1 = new File(['xx'], 'x.txt', { type: 'plain/text' })

      // first time change
      setFile(() => fd)
      await nextTick()
      const firstTimeUrl = objectUrl()
      expect(firstTimeUrl).to.include('blob:http')

      // second time change
      setFile(() => fd1)
      await nextTick()
      expect(objectUrl()).to.include('blob:http')
      expect(objectUrl()).to.not.equal(firstTimeUrl)
    })
  })

  it('should work with Blob', () => {
    return runAsyncHook(async () => {
      const [file, _] = createSignal<Blob>(new Blob(['xxxxx'], { type: 'plain/text' }))
      const objectUrl = useObjectUrl(file)
      await nextTick()
      expect(objectUrl()).to.include('blob:http')
    })
  })

  it('should work with MediaSource', () => {
    return runAsyncHook(async () => {
      const [file, _] = createSignal<MediaSource>(new MediaSource())
      const objectUrl = useObjectUrl(file)
      await nextTick()
      expect(objectUrl()).to.include('blob:http')
    })
  })

  it('should work when passing Blob directly', () => {
    return runAsyncHook(async () => {
      const objectUrl = useObjectUrl(new Blob(['xxx']))
      await nextTick()
      expect(objectUrl()).to.include('blob:http')
    })
  })

  it('should work when passing MediaSource directly', () => {
    return runAsyncHook(async () => {
      const objectUrl = useObjectUrl(new MediaSource())
      await nextTick()
      expect(objectUrl()).to.include('blob:http')
    })
  })

  it('should work when passing File directly', () => {
    return runAsyncHook(async () => {
      const objectUrl = useObjectUrl(new File(['xxxx'], 'xxx.txt'))
      await nextTick()
      expect(objectUrl()).to.include('blob:http')
    })
  })
})
