import { mount } from '@dream2023/cypress-solidjs'
import Demo from './demo'

describe('useWindowScroll', () => {
  it('test x axis scrolling value', () => {
    mount(() => <Demo />)
    cy.window().scrollTo(100, 0)
    cy.get('[data-testid="useWindowScroll"]').should('have.text', 'x: 100.0 y: 0.0')
  })

  it('test y axis scrolling value', () => {
    mount(() => <Demo />)
    cy.window().scrollTo(0, 100)
    cy.get('[data-testid="useWindowScroll"]').should('have.text', 'x: 0.0 y: 100.0')
  })

  it('test both side axis scrolling value', () => {
    mount(() => <Demo />)
    cy.window().scrollTo(100, 100)
    cy.get('[data-testid="useWindowScroll"]').should('have.text', 'x: 100.0 y: 100.0')
  })
})
