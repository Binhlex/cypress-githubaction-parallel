var profileEles = require("../objects/profile-elements");

export class ProfilePage {
  navigateToProfilePage() {
    cy.get(profileEles.ProfileElements.lnkProfile).click();
  }

  isBookAddedSuccessfully(bookName) {
    cy.contains(bookName).should("be.visible");
  }

  searchBook(bookName) {
    cy.get(profileEles.ProfileElements.txtSearch)
      .type(bookName)
      .should("have.value", bookName);
  }

  clickDeleteIcon() {
    cy.get(profileEles.ProfileElements.iconDelete).click();
  }

  clickOKButton() {
    cy.get(profileEles.ProfileElements.bntOK).click();
  }

  isAlertBookDeletedShow() {
    cy.verifyTextOnAlert("Book deleted.");
  }

  isDeletedBookSuccessfully(bookName) {
    cy.contains(bookName).should("not.exist");
  }
}
