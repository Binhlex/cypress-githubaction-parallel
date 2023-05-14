/// <reference types="cypress"/>
import { StudentRegisterPage } from '../../../support/pages/student-page'

describe('Register Student', function () {
  const studentRegisterPage = new StudentRegisterPage()

  before(function () {
    cy.fixture('student').then(function (jsondata) {
      this.student = jsondata
    })
  })

  after('Close the popup message', function () {
    cy.get('#closeLargeModal').click()
  })

  it('Register a student successfully', function () {
    cy.visit('/automation-practice-form')
    studentRegisterPage
      .gettxtFirstName()
      .type(this.student.firstname)
      .should('have.value', this.student.firstname)
    studentRegisterPage
      .gettxtLastName()
      .type(this.student.lastname)
      .should('have.value', this.student.lastname)
    studentRegisterPage
      .gettxtEmail()
      .type(this.student.email)
      .should('have.value', this.student.email)
    studentRegisterPage.getrdoMale().click()
    studentRegisterPage.gettxtMobile().type(this.student.phone)
    studentRegisterPage.getbntSubmit().click()
    //assert information
    cy.get('#example-modal-sizes-title-lg').should(
      'contain',
      'Thanks for submitting the form'
    )
    cy.get('tbody > :nth-child(1) > :nth-child(2)').should(
      'contain',
      this.student.firstname + ' ' + this.student.lastname
    )
    cy.get('tbody > :nth-child(2) > :nth-child(2)').should(
      'contain',
      this.student.email
    )
    cy.get('tbody > :nth-child(3) > :nth-child(2)').should(
      'contain',
      this.student.gender
    )
    cy.get('tbody > :nth-child(4) > :nth-child(2)').should(
      'contain',
      this.student.phone
    )
  })
})
