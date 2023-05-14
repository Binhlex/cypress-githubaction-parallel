// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { LoginPage } from '../support/pages/login-page'
const loginPage = new LoginPage()

Cypress.Commands.add('login', () => {
  cy.visit('https://demoqa.com/login')
  loginPage.gettxtUserName().type(Cypress.env('userName'))
  loginPage.gettxtPassword().type(Cypress.env('password'))
  loginPage.getbtnLogin().click()
  cy.contains('Log out').should('be.visible')
})

Cypress.Commands.add(
  'getLink',
  {
    prevSubject: 'optional',
  },
  (subject) => {
    if (subject) {
      cy.get(subject).get('a').its('href')
    } else {
      cy.get('a').its('href')
    }
  }
)

Cypress.Commands.add('clickLink', (label) => {
  cy.get('a').should('contain.text', label).contains(label).click()
})

Cypress.Commands.add('verifyTextOnAlert', (text) => {
  cy.on('window:alert', (txt) => {
    expect(txt).to.contains(text)
  })
})

// Cypress.Commands.add("confirmAlert", () => {
//   cy.on("window:confirm", (txt) => {
//     expect(txt).to.contains(text);
//   });
// });

/*
Cypress.Commands.add('getText', { prevSubject: 'element' }, 
    ($element: JQuery<HTMLElement>) => {
      cy.wrap($element).scrollIntoView()
      return cy.wrap($element).invoke('text')
    }
  )
  */

Cypress.Commands.add('generateToken', () => {
  const options = {
    method: 'POST',
    url: '/Account/v1/GenerateToken',
    body: {
      userName: Cypress.env('userName'),
      password: Cypress.env('password'),
    },
  }
  cy.request(options).then((res) => {
    var token = res.body.token
    // Cypress.env('userToken', `${token}`);
    // console.log(Cypress.env('userToken'))
    return token
  })
})

Cypress.Commands.add('addABookToProfile', (isbn) => {
  cy.generateToken().then((token) => {
    cy.request({
      method: 'POST',
      url: '/BookStore/v1/Books',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      },
      body: {
        userId: Cypress.env('userId'),
        collectionOfIsbns: [
          {
            isbn: isbn,
          },
        ],
      },
    })
      .its('status')
      .should('eq', 201)
  })
})

Cypress.Commands.add('deleteABook', (isbn) => {
  cy.generateToken().then((token) => {
    cy.request({
      method: 'DELETE',
      url: '/BookStore/v1/Book',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      },
      body: {
        isbn: isbn,
        userId: Cypress.env('userId'),
      },
    })
      .its('status')
      .should('eq', 204)
  })
})

Cypress.Commands.add('deleteAllBook', () => {
  cy.generateToken().then((token) => {
    cy.request({
      method: 'DELETE',
      url: '/BookStore/v1/Books?UserId=' + Cypress.env('userId'),
      headers: {
        Authorization: `Bearer ` + token,
      },
    })
      .its('status')
      .should('eq', 204)
  })
})
