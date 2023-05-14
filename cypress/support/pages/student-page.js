export class StudentRegisterPage {
  gettxtFirstName() {
    return cy.get("#firstName");
  }

  gettxtLastName() {
    return cy.get("#lastName");
  }

  gettxtEmail() {
    return cy.get("#userEmail");
  }

  getrdoMale() {
    return cy.contains("Male");
  }

  gettxtMobile() {
    return cy.get("#userNumber");
  }

  gettxtDOb() {
    return cy.get("#dateOfBirthInput");
  }

  getddlSubjects() {
    return cy.get(".subjects-auto-complete__value-container");
  }

  getchbHobbies_1() {
    return cy.get(
      "#hobbiesWrapper > .col-md-9 > :nth-child(1) > .custom-control-label"
    );
  }

  getbntChooseFile() {
    return cy.get("#uploadPicture");
  }

  gettxaAddress() {
    return cy.get("#currentAddress");
  }

  getddlState() {
    return cy.get(
      "#state > .css-yk16xz-control > .css-1hwfws3 > .css-1wa3eu0-placeholder"
    );
  }

  getddlState_opt1() {
    return cy.get("#state div[tabindex]:first-child");
  }

  getddlCity() {
    return cy.get("#stateCity-wrapper > :nth-child(3)");
  }

  getddlCity_opt2() {
    return cy.get("#city div[tabindex]:nth-child(2)");
  }

  getbntSubmit() {
    return cy.contains("Submit");
  }
}
