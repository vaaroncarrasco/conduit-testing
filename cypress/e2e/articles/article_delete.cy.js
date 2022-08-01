describe('delete articles', () => {
  beforeEach(() => {
    cy.login()
  });

  it('delete 1st article through UI', () => {

    cy.newArticle()

    cy.visit(`/@${localStorage.getItem('username')}`);
    cy.get(':nth-child(1) > .article-preview > .preview-link > p.ng-binding').click()
    cy.get('[ng-click="$ctrl.deleteArticle()"]:first').click();
  })

})