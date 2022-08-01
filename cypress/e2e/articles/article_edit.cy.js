import mockArticle from "../../utils/mockArticle"

let updatedMock;
let oldArticle;

describe('Edit article functionality', () => {

  beforeEach(() => {

    updatedMock = mockArticle();

    cy.login()
    cy.visit('/editor/')
  })

  it('edits article correctly', () => {
    cy.newArticle();

    cy.then(() => {
      oldArticle = JSON.parse(localStorage.getItem('newArticle'));

      cy.visit(`/editor/${oldArticle.slug}`);
    })

    cy.get(':nth-child(1) > .form-control').clear().type(updatedMock.title)
    cy.get(':nth-child(2) > .form-control').clear().type(updatedMock.description)
    cy.get(':nth-child(3) > .form-control').clear().type(updatedMock.body)


    cy.get('[ng-click="$ctrl.removeTag(tag)"]').each(($el) => {
      $el.click()
    })

    updatedMock.tagList.forEach(tag => {
      cy.get(':nth-child(4) > .form-control').type(`${tag}{enter}`)
    })

    cy.contains('Publish Article').click()

    cy.contains(updatedMock.title)
    cy.contains(updatedMock.body)

    updatedMock.tagList.forEach(tag => {
      cy.contains(tag)
    })

  })

})
