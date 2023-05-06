import { mount } from '@dream2023/cypress-ct-solid-js'
import Demo from './demo'

describe('onClickOutside', () => {
  it('demo', () => {
    mount(() => <Demo />)
  })
})
