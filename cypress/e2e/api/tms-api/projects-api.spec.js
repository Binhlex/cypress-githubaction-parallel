/// <reference types = "cypress" />
import { getHeaders } from '../../../utils/api-helpers/headers-helper'

describe('TMS API testing', () => {
  Cypress.config('baseUrl', 'http://192.168.237.10:3000')
  let token
  let user

  before('Login TMS', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      body: {
        username: Cypress.env('tmsUsername'),
        password: Cypress.env('tmsPassword'),
      },
    })
      .its('body')
      .then((body) => {
        cy.log('token: ', body.id_token)
        localStorage.setItem('jwt', body.id_token)
      })
  })

  beforeEach(function setUser() {
    token = localStorage.getItem('jwt')
    // cy.log(token)
    cy.fixture('projects').then((project) => {
      this.project = project
    })
  })

  it('Create a new project', function () {
    cy.request({
      method: 'POST',
      url: '/api/projects',
      headers: getHeaders(true, token),
      body: this.project,
    }).then((res) => {
      expect(res.status).to.be.eq(200)
      expect(res.body.location.id).to.be.eq(this.project.locationId)
      expect(res.body.projectName).to.be.eq(this.project.projectName)
    })
  })
})
