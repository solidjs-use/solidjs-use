import { mount } from '@dream2023/cypress-solidjs'
import Demo from './demo'

describe('onClickOutside', () => {
  it('demo', () => {
    mount(() => <Demo />)
  })
})
