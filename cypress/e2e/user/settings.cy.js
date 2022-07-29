import { faker } from '@faker-js/faker';

const randomBio = faker.lorem.sentence(); // Euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. 

describe('Settings functionality', () => {

  beforeEach(() => {
    cy.login()
    cy.visit('/settings')
  })

  it('Update settings', () => {

    cy.get(':nth-child(3) > .form-control').clear().type(randomBio)

    cy.get('[ng-disabled="$ctrl.isSubmitting"] > .btn').click()

    cy.url().should('include', `/@${ localStorage.getItem('username') }`)

    cy.get('.col-xs-12 > p.ng-binding').contains(randomBio)

  })

  it('Logout btn works', () => {
    cy.get('.btn-outline-danger').click()
    cy.url().should('be.eq', `${ Cypress.config().baseUrl }` + '/')
    cy.get('.banner').should('be.visible')

  })

})