describe('Login testing', () => {

  beforeEach(() => {
    cy.visit('/login')
  })

  it('Logins correctly through UI', () => {

    cy.get(':nth-child(2) > .form-control').type( Cypress.env('userEmail') )
    cy.get(':nth-child(3) > .form-control').type( Cypress.env('userPassword') )
    cy.get('.btn').click()

    cy.intercept({
      method: 'POST',
      url: `${Cypress.env('apiURL')}/users/login`,
    }).as('loginIntercept')

    cy.url().should('be.eq', Cypress.config('baseUrl') + '/')

    cy.wait('@loginIntercept').then(({ response }) => {

      // Check the username rendered matches the one from the response
      cy.get(':nth-child(4) > .nav-link').contains(response.body.user.username)

    })

  })

  it('Empty submit fails', () => {
    cy.get('.btn').click()

    cy.intercept({
      method: 'POST',
      url: `${Cypress.env('apiURL')}/users/login`,
    }).as('loginIntercept')

    cy.wait('@loginIntercept').then(({ response }) => {
      assert(response.statusCode === 500)
    })
    cy.url().should('be.eq', Cypress.config('baseUrl') + '/login')
  })

  it('Input error displays', () => {

    cy.get(':nth-child(2) > .form-control').type( Cypress.env('userEmail') )
    cy.get(':nth-child(3) > .form-control').type( Cypress.env('userPassword') + 'blablabla' )
    cy.get('.btn').click()

    cy.intercept({
      method: 'POST',
      url: `${Cypress.env('apiURL')}/users/login`,
    }).as('loginIntercept')

    cy.wait('@loginIntercept').then(({ response }) => {
      assert(response.statusCode === 403)
    })

    cy.contains('email or password is invalid').should('be.visible')
  })

})