import { faker } from '@faker-js/faker';

let articleMock;

describe('New article functionality', () => {

  beforeEach(() => {

    articleMock= {
      title: faker.lorem.sentence(1),
      description: faker.lorem.sentence(2),
      body: faker.lorem.paragraph(2),
      tags: [
        faker.lorem.word(),
        faker.lorem.word(),
        faker.lorem.word(),
      ]
    }

    cy.login()
    cy.visit('/editor/')
  })

  it('should be able to create a new article', () => {

    cy.get(':nth-child(1) > .form-control').type(articleMock.title)
    cy.get(':nth-child(2) > .form-control').type(articleMock.description)
    cy.get(':nth-child(3) > .form-control').type(articleMock.body)

    articleMock.tags.forEach(tag => {
      cy.get(':nth-child(4) > .form-control').type(`${tag}{enter}`)
    })

    cy.get('.btn').click()

    cy.url().should('include', '/article/')

    cy.get('a[href*="#/editor/"]').should('length', 3)
    cy.get('[ng-click="$ctrl.deleteArticle()"]').should('length', 2)

  })

})