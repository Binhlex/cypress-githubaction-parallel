/// <reference types="cypress"/>
import { getHeaders } from '../../../utils/api/headers-helper'

describe('bookstore API tests', () => {
  let token
  let user
  var isbn = Cypress.env('isbn')
  const userId = Cypress.env('userId')

  // before(() => {
  //   token = localStorage.getItem('token')
  //   console.log('BeforeAll', token)
  // })

  // beforeEach(function getToken() {
  //   var deleteHeaders = getHeaders(false, token)
  //   BookstoreHelper.deleteAllBooks(userId, deleteHeaders)
  // })

  it.only('Basic Auth', () => {
    cy.request({
      method: 'POST',
      url: '/Account/v1/Authorized',
      body: {
        userName: 'binhlex',
        password: 'Binhtest@123',
      },
    })
      .its('status')
      .should('eq', 200)
  })

  it('EX3 - Add a book to collection', () => {
    cy.request({
      method: 'POST',
      url: '/BookStore/v1/Books',
      headers: getHeaders(false, token),
      body: {
        userId: Cypress.env('userId'),
        collectionOfIsbns: [
          {
            isbn: `${isbn}`,
          },
        ],
      },
    }).then((response) => {
      expect(response.body.books[0]).to.be.deep.eq({ isbn: `${isbn}` })
    })
  })

  it.skip('EX4 - Delete a book from collection', () => {
    cy.addBook(isbn, token)

    cy.request({
      method: 'DELETE',
      url: '/BookStore/v1/Book',
      headers: getHeaders(true, token),
      body: {
        userId: Cypress.env('userId'),
        isbn: `${isbn}`,
      },
    })
      .its('status')
      .should('eq', 204)
  })

  it.skip('EX5 - Add an existing book one more time', () => {
    cy.addBook(isbn, token)
    cy.request({
      method: 'POST',
      url: '/BookStore/v1/Books',
      headers: getHeaders(false, token),
      body: {
        userId: Cypress.env('userId'),
        collectionOfIsbns: [
          {
            isbn: `${isbn}`,
          },
        ],
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.message).to.be.eq(
        "ISBN already present in the User's Collection!"
      )
    })
  })
})
