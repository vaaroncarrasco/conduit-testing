describe('Conduit homepage testing', () => {

  beforeEach(() => {
    cy.login()
  })

  it('Homepage with user logged in renders correctly', () => {

    // Banner is not visible anymore
    cy.get('.banner').should('not.be.visible');

    // Nav links change depending on whether user is logged in
    cy.get('[show-authed="true"] > :nth-child(2) > .nav-link')
      .should('have.attr', 'href', '#/editor/');

    cy.get('[show-authed="true"] > :nth-child(3) > .nav-link')
      .should('have.attr', 'href', '#/settings');

    cy.get('[show-authed="true"] > :nth-child(4) > .nav-link')
      .should('have.attr', 'href', `#/@${localStorage.getItem('username')}`);

    // Your feed link is visible
    cy.get('.feed-toggle > .nav > li:first')
      .should('contain', 'Your Feed');

    // Articles rendered
    cy.get(':nth-child(1) > .article-preview')
      .should('be.visible');

    // Popular tag exists
    cy.contains('Popular Tags')
      .should('be.visible');

    // Github footer link is visible
    cy.footerDisplays();
  })

})