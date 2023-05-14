var bookStoreEles = require('../objects/bookstore-elements')

export class BookStorePage {
  navigateToBookStorePage() {
    cy.get(bookStoreEles.BookStoreElements.lnkBookStore).click()
  }

  clickOnABook(bookName) {
    cy.contains(bookName).click()
  }

  clickOnAddBookButton() {
    cy.contains('Add To Your Collection').click()
  }

  isAlertBookAddedShow() {
    cy.verifyTextOnAlert('Book added to your collection.')
  }

  getlnkBookStore() {
    return cy.get(
      ':nth-child(6) > .element-list > .menu-list > #item-2 > .text'
    )
  }

  getlnkProfile() {
    return cy.get(
      ':nth-child(6) > .element-list > .menu-list > #item-3 > .text'
    )
  }

  geticoDelete() {
    return cy.get('#delete-record-undefined > svg > path')
  }

  getbntOK() {
    return cy.get('#closeSmallModal-ok')
  }
}
