/// <reference types="cypress"/>
import { getHeaders } from '../../../utils/api-helpers/headers-helper'
import { BookstoreHelper } from '../../../utils/api-helpers/bookstore-helper'
import { STATUS_CODE } from '../../../utils/api-helpers/api-constants'
import { ERROR_MESSAGE } from '../../../utils/api-helpers/api-constants'

describe('bookstore API tests', () => {
  const isbn = Cypress.env('isbn')
  const userId = Cypress.env('userId')
  let token
  let addBookHeaders
  let deleteHeaders
  let addBody = {
    userId: userId,
    collectionOfIsbns: [
      {
        isbn: isbn,
      },
    ],
  }

  let deleteBody = {
    userId: userId,
    isbn: isbn,
  }

  before(() => {
    // token = localStorage.getItem('token')
    token = Cypress.env('token')
    deleteHeaders = getHeaders(true, token)
    addBookHeaders = getHeaders(true, token)
    BookstoreHelper.deleteAllBooks(userId, deleteHeaders)
  })

  beforeEach(() => {
    BookstoreHelper.addBooksToCollection(addBookHeaders, addBody)
  })

  it('Delete a book from collection successfully', () => {
    BookstoreHelper.deleteABook(deleteHeaders, deleteBody)
    cy.get('@response').then((response) => {
      expect(response.status).equal(
        STATUS_CODE.RESPONSE_CODE_SUCCESSFUL_NO_CONTENT
      )
    })
  })

  it('Delete a unexisting book and verify the error', () => {
    var bodyWrongISBN = {
      userId: userId,
      isbn: '123456789',
    }
    BookstoreHelper.deleteABook(deleteHeaders, bodyWrongISBN)
    cy.get('@response').then((response) => {
      expect(response.status).equal(STATUS_CODE.RESPONSE_CODE_BAD_REQUEST)
      expect(response.body.code).equal(
        ERROR_MESSAGE.ERROR_CODE_BOOKS_NOT_EXISTING_ON_COLLECTION
      )
      expect(response.body.message).equal(
        ERROR_MESSAGE.ERROR_MSG_BOOKS_NOT_EXISTING_ON_COLLECTION
      )
    })
  })

  it('Delete a book with a wrong token and verify the error', () => {
    deleteHeaders = getHeaders(true, 'wrongtoken')
    BookstoreHelper.deleteABook(deleteHeaders, deleteBody)
    cy.get('@response').then((response) => {
      expect(response.status).equal(STATUS_CODE.RESPONSE_CODE_UNAUTHORIZED)
      expect(response.body.code).equal(ERROR_MESSAGE.ERROR_CODE_UNAUTHORIZED)
      expect(response.body.message).equal(ERROR_MESSAGE.ERROR_MSG_UNAUTHORIZED)
    })
  })
})
