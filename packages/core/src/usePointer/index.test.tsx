import { mount } from '@dream2023/cypress-solidjs'
import Demo from './demo'

describe('usePointer', () => {
  it('demo', () => {
    mount(() => <Demo />)
  })
})
