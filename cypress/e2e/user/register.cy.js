
let newUser;

describe('Register testing', () => {

  beforeEach(() => {
    cy.visit('/register')
    newUser = {
      username: 'testuser' + Math.floor(Math.random() * 1000000),
      email: 'testuser' + Math.floor(Math.random() * 1000000) + '@testuser.com',
      password: 'testuser',
    }
  })

  it('Registers correctly through UI', () => {

    cy.get(':nth-child(1) > .form-control').type( newUser.username )
    cy.get(':nth-child(2) > .form-control').type( newUser.email )
    cy.get(':nth-child(3) > .form-control').type( newUser.password )
    cy.get('.btn').click()

    cy.url().should('be.eq', Cypress.config('baseUrl') + '/')

    cy.get(':nth-child(4) > .nav-link').contains(newUser.username)
  })

  it('Empty submit fails', () => {
    cy.get('.btn').click()

    cy.intercept({
      method: 'POST',
      url: `${Cypress.env('apiURL')}/users`,
    }).as('loginIntercept')

    cy.wait('@loginIntercept').then(({ response }) => {
      assert(response.statusCode === 422)
    })
    cy.url().should('be.eq', Cypress.config('baseUrl') + '/register')
  })

  it.only('Username empty input error', () => {

    cy.get(':nth-child(2) > .form-control').type( newUser.email )
    cy.get(':nth-child(3) > .form-control').type( newUser.password )
    cy.get('.btn').click()

    cy.contains("username can't be blank").should('be.visible')

  })

  it.only('Email empty input error', () => {

    cy.get(':nth-child(1) > .form-control').type( newUser.username )
    cy.get(':nth-child(3) > .form-control').type( newUser.password )
    cy.get('.btn').click()

    cy.contains("email can't be blank").should('be.visible')

  })


  it.only('Password empty input error', () => {

    cy.get(':nth-child(1) > .form-control').type( newUser.username )
    cy.get(':nth-child(2) > .form-control').type( newUser.email )
    cy.get('.btn').click()

    cy.contains("password can't be blank").should('be.visible')

  })

})