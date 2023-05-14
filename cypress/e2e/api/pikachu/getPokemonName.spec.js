describe('API testing with cypress', () => {
  // Cypress.config('baseUrl', 'https://pokeapi.co/api/v2/pokemon')

  beforeEach(() => {
    // cy.request('25').as('pikachu')
  })

  it.only('validate header', () => {
    cy.request('https://pokeapi.co/api/v2/pokemon/25')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')
  })

  it('validate status code', () => {
    cy.get('@pikachu').its('status').should('equal', 200)
  })

  it('validate the pokemon name', () => {
    //   cy.get('@pikachu').its('body').should('include', { name: 'pikachu' })
    cy.get('@pikachu').its('body').its('name').should('eq', 'pikachu')
  })
})
