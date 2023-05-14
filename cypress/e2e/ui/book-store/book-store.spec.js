/// <reference types="cypress"/>
import { BookStorePage } from '../../../support/pages/bookstore-page'
import { AuthHelper } from '../../../utils/api-helpers/auth-helper'

describe('Book Store Tests', () => {
  const bookName = "You Don't Know JS"
  const isbn = '9781491904244'
  const bookStorePage = new BookStorePage()

  before('Go to HomePage', () => {
    cy.deleteAllBook()
    // AuthHelper.login(Cypress.env('userName'), Cypress.env('password'))
    cy.login()
  })

  beforeEach(() => {
    AuthHelper.preserveCookies()
  })

  afterEach(() => {
    cy.deleteAllBook()
  })

  it('Add book to collection', () => {
    // cy.login()
    // bookStorePage.getlnkBookStore().click() //Click on Book Store menu
    // AuthHelper.login(Cypress.env('userName'), Cypress.env('password'))
    cy.visit('/books')
    cy.clickLink(bookName)
    cy.contains('Add To Your Collection').click()
    cy.verifyTextOnAlert('Book added to your collection.')

    //Verify that the book is present on Profile
    bookStorePage.getlnkProfile().click()
    cy.contains(bookName).should('be.visible')
  })

  it('Delete a book from collection', () => {
    cy.addABookToProfile(isbn)
    AuthHelper.login(Cypress.env('userName'), Cypress.env('password'))
    cy.visit('/books')
    bookStorePage.getlnkProfile().click()
    cy.contains(bookName).should('be.visible')
    bookStorePage.geticoDelete().click()
    bookStorePage.getbntOK().click()
    cy.verifyTextOnAlert('Book deleted.')
  })
})
