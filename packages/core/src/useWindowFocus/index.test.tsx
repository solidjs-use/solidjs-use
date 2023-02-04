import { mount } from '@dream2023/cypress-solidjs'
import Demo from './demo'

describe('useWindowFocus', () => {
  it('should show startMessage at first time', () => {
    mount(() => <Demo />)
    cy.get('[data-testid="useWindowFocus"]').should(
      'have.text',
      '💡 Click somewhere outside of the document to unfocus.'
    )
  })

  it('should change value when blur window', () => {
    mount(() => <Demo />)
    cy.get('[data-testid="useWindowFocus"]').should(
      'have.text',
      '💡 Click somewhere outside of the document to unfocus.'
    )
    cy.window().trigger('blur')
    cy.get('[data-testid="useWindowFocus"]').should('have.text', 'ℹ Tab is unfocused')
  })
})
