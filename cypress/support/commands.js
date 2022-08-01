import mockArticle from '../utils/mockArticle';

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiURL')}/users/login`,
    body: {
      user: {
        email: Cypress.env('userEmail'),
        password: Cypress.env('userPassword')
      }
    }
  }).then((resp) => {
    localStorage.setItem('jwtToken', resp.body.user.token)
    localStorage.setItem('username', resp.body.user.username)
    localStorage.setItem('bio', resp.body.user.bio)
    localStorage.setItem('image', resp.body.user.image)
    cy.visit('/')
  })
})

// Footer w/ GitHub repo link is visible
Cypress.Commands.add('footerDisplays', () => {
  cy.get('[href="https://github.com/gothinkster/angularjs-realworld-example-app"]')
    .should('be.visible');
})

// Create article through API
// Authorization: `${localStorage.getItem('jwtToken')}`

Cypress.Commands.add('newArticle', () => {

  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiURL')}/articles`,
    body: {
      article: { ...mockArticle() }
    },
    headers: {
      authorization: `Token ${localStorage.getItem('jwtToken')}`
    }
  }).then((resp) => {

    cy.visit(`/article/${resp.body.article.slug}`)

    localStorage.setItem('newArticle', JSON.stringify(resp.body.article) );

  })

})
