var loginEles = require("../objects/login-elements");

export class LoginPage {
  navigateToLoginPage() {
    cy.visit("/login");
  }

  inputUserName(username) {
    cy.get(loginEles.LoginElements.txtUserName).type(username);
  }

  inputPassword(password) {
    cy.get(loginEles.LoginElements.txtPassword).type(password);
  }

  clickSubmit() {
    cy.get(loginEles.LoginElements.bntLogin).click();
  }

  loginSuccess(userName, password) {
    this.inputUserName(userName);
    this.inputPassword(password);
    this.clickSubmit;
  }

  isLoginSuccess() {
    cy.contains("Log out").should("be.visible");
  }
}
