import { RequestHelper } from './request-helper'
import { BOOKSTORE_ENDPOINT } from './api-constants'
import { STATUS_CODE } from './api-constants'

export const BookstoreHelper = {
  deleteAllBooks(userId, headers) {
    let endPoint = BOOKSTORE_ENDPOINT.ENDPOINT_DELETE_ALL_BOOKS(userId)
    RequestHelper.sendDeleteRequest(endPoint, headers)
    cy.get('@response').then((res) => {
      expect(res.status).equal(STATUS_CODE.RESPONSE_CODE_SUCCESSFUL_NO_CONTENT)
    })
  },

  deleteABook(headers, body) {
    let endPoint = BOOKSTORE_ENDPOINT.ENDPOINT_DELETE_A_BOOK
    RequestHelper.sendDeleteRequest(endPoint, headers, body)
  },

  addBooksToCollection(headers, body) {
    let endPoint = BOOKSTORE_ENDPOINT.ENDPOINT_ADD_BOOK_TO_COLLECTION_CREATE
    RequestHelper.sendPostRequest(endPoint, headers, body)
  },
}
