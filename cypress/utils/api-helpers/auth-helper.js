import { ACCOUNT_ENDPOINT } from './api-constants'

export const AuthHelper = {
  generateToken(username, password) {
    cy.request({
      method: 'POST',
      url: ACCOUNT_ENDPOINT.ENDPOINT_GENERATE_TOKEN_CREATE,
      body: {
        userName: username,
        password: password,
      },
    }).then((response) => {
      cy.log('token in storage: ' + response.body.token)
      //Method 1: Save token to local
      // window.localStorage.setItem('token', response.body.token)

      //Method 2: Save token to environment
      Cypress.env('token', response.body.token)
    })
  },

  login(username, password) {
    let url = 'https://demoqa.com/Account/v1/Login' //Cypress.env('baseUrl') + ACCOUNT_ENDPOINT.ENDPOINT_LOGIN
    cy.request({
      method: 'POST',
      url: url,
      body: {
        userName: username,
        password: password,
      },
    }).then((response) => {
      cy.setCookie('userName', response.body.username)
      cy.setCookie('userID', response.body.userId)
      cy.setCookie('token', response.body.token)
      cy.setCookie('expires', response.body.expires)
    })
  },

  preserveCookies() {
    cy.getCookie('token')
      .should('exist')
      .then((cookies) => {
        // expect(cookies).to.have.property('name', 'sessionid'),
        // expect(cookies).to.have.property('domain', '127.0.0.1')
      })
    Cypress.Cookies.preserveOnce('userName')
    Cypress.Cookies.preserveOnce('userID')
    Cypress.Cookies.preserveOnce('token')
    Cypress.Cookies.preserveOnce('expires')
  },
}
