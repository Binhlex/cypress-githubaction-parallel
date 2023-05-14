// const { expect } = require('chai')
/// <reference types="Cypress" />

describe('API Testing', () => {
  Cypress.config('baseUrl', 'http://dummy.restapiexample.com')

  it('Get all employees', () => {
    cy.request('/api/v1/employees').then((response) => {
      expect(response).to.have.property('status', 200)
      expect(response.body).to.not.be.null
      expect(response.body.data).to.have.length(24)
    })
  })

  it('Create a new employee successfully', () => {
    var employee = { name: 'test', salary: '123', age: '20' }
    cy.request({
      method: 'POST',
      url: '/api/v1/create',
      body: employee,
    })
      .its('body')
      .its('data')
      .should('include', { name: 'test' })
      .and('include', { salary: '123' })
      .and('include', { age: '23' })
  })

  it('Update an employee', () => {
    const employee = { name: 'test1' }
    const employeeID = 1000
    cy.request('PUT', `/api/v1/update/${employeeID}`, employee)
      .its('body')
      .should('include', { status: 'success' })
      .and('include', {
        message: 'Successfully! Record has been updated.',
      })
  })

  it('Delete an employee', () => {
    const employeeID = 100
    cy.request('DELETE', `/api/v1/delete/${employeeID}`).then((res) => {
      expect(res.status).be.eq(200)
      expect(res.body.data).to.be.eq(`${employeeID}`)
      expect(res.body.message).to.be.eq('Successfully! Record has been deleted')
    })
  })
})
