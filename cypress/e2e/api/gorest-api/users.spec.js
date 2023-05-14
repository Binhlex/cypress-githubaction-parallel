/// <reference types = "cypress" />
let accessToken =
  '7f490d2c0a77815ec42b92eb335857995e46aa7af61db3ca63834603192ae800'
Cypress.config('baseUrl', 'https://gorest.co.in')
let userEndPoint = '/public-api/users'

let chars = 'abcdefghijklmnopqrstuvwxyz1234567890'
let string = ''
for (var i = 0; i < 10; i++) {
  string += chars[Math.floor(Math.random() * chars.length)]
}

let email = string + '@cypress.io'
let userName = 'cytestTest'
let userUpdateID = 55
let requestBody = {
  name: userName,
  email: email,
  gender: 'Male',
  status: 'Active',
}
let requestHeaders = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + accessToken,
}

describe('API tests for user endpoint', () => {
  const addUser = (body) =>
    cy.request({
      method: 'POST',
      url: userEndPoint,
      headers: requestHeaders,
      body: body,
    })

  context('Create a new user tests', () => {
    it.only('Create a new user successfully', () => {
      cy.request({
        method: 'POST',
        url: '/public-api/users',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        body: requestBody,
      }).then((res) => {
        expect(res.status).equal(200)
        expect(res.body.code).equal(201)
        expect(res.body.data.id).is.not.null
        expect(res.body.data.name).equal(requestBody.name)
        expect(res.body.data.email).equal(requestBody.email)
        expect(res.body.data.gender).equal(requestBody.gender.toLowerCase())
        expect(res.body.data.status).equal(requestBody.status.toLowerCase())
      })
    })

    it('Create a new user using an existing email and verify the error', () => {
      cy.request({
        method: 'POST',
        url: userEndPoint,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        body: requestBody,
      }).then((res) => {
        expect(res.status).equal(200)
        expect(res.body.code).equal(422)
        expect(res.body.data[0].field).equal('email')
        expect(res.body.data[0].message).equal('has already been taken')
      })
    })

    it('Authentication failed when inputting a wrong token', () => {
      cy.request({
        method: 'POST',
        url: userEndPoint,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer wrong' + accessToken,
        },
        body: requestBody,
      }).then((res) => {
        expect(res.status).equal(200)
        expect(res).to.have.property('headers')
        expect(res.headers['content-type']).equal(
          'application/json; charset=utf-8'
        )
        expect(res.body.code).equal(401)
        expect(res.body.data.message).equal('Authentication failed')
      })
    })

    it('Internal server error when inputting wrong body format', () => {
      cy.request({
        method: 'POST',
        url: userEndPoint,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer wrong' + accessToken,
        },
        body: 'wrong format of body',
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).equal(500)
        expect(res).to.have.property('headers')
        expect(res.headers['content-type']).equal('text/plain; charset=utf-8')
        expect(res.body).equal(
          "500 Internal Server Error\nIf you are the administrator of this website, then please read this web application's log file and/or the web server's log file to find out what went wrong."
        )
      })
    })

    it('Data validation failed - using an emply email', () => {
      cy.request({
        method: 'POST',
        url: userEndPoint,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        body: {
          name: userName,
          email: '',
          gender: 'Male',
          status: 'Active',
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).equal(200)
        expect(res).to.have.property('headers')
        expect(res.headers['content-type']).equal(
          'application/json; charset=utf-8'
        )
        expect(res.body.code).equal(422)
        expect(res.body.data[0]).to.have.property('field').equal('email')
        expect(res.body.data[0].message).equal("can't be blank")
      })
    })
  })

  context.skip('Intercept test', () => {
    var interceptURL = 'https://gorest.co.in/public-api/users/123'
    let bodyIntercept = `{
            "gender": "Female",
            "status": "Inactive"
        }`
    it('Intercept test', () => {
      cy.intercept('PUT', '/public-api/users/*', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            code: 403,
            meta: null,
            data: {
              message: 'You are not allowed to access the API endpoint.',
            },
          },
        })
      }).as('PUTUser')

      cy.visit('https://gorest.co.in/rest-console')
      cy.get('#rsq_type').select('PUT')
      cy.get('#rsq_url').clear().type(interceptURL)
      cy.get('#rsq_header_value_0')
        .clear()
        .type('Bearer ' + accessToken)
      cy.get('#rsq_body').clear().type(bodyIntercept)
      cy.get('#rsq_send').click()

      cy.wait('@PUTUser').then((intercept) => {
        expect(intercept.response.statusCode).equal(200)
        expect(intercept.response.body.code).equal(403)
        expect(intercept.response.body.data.message).equal(
          'You are not allowed to access the API endpoint.'
        )
      })
    })
  })

  context('Get users test', () => {
    it('Retrieve all users successfully', () => {
      cy.request({
        method: 'GET',
        url: userEndPoint,
        qs: {
          page: '2',
        },
        log: true,
        body: 'cypressbody',
        failOnStatusCode: true,
        form: true,
        encoding: 'utf8',
        gzip: true,
        retryOnStatusCodeFailure: true,
        retryOnNetworkFailure: true,
        timeout: 3000,
      }).then((res) => {
        expect(res.status).eq(200)
        expect(res.body.code).eq(200)
        expect(res.body.meta.pagination.page).eq(2)
        expect(res.body.meta.pagination.limit).eq(20)
        expect(res.body.data).have.length(20)
        // expect(res.body.data[0]).have.property('id', 44);
        expect(res.body.data[0]).have.property('id')
        expect(res.body.data[0]).have.property('name')
        expect(res.body.data[0]).have.property('email')
        expect(res.body.data[0]).have.property('status')
        expect(res.body.data[0]).have.property('gender')
      })
    })

    it('Get details of user id 44 successfully', () => {
      cy.request({
        url: userEndPoint + '/44',
      }).then((res) => {
        expect(res.status).eq(200)
        expect(res.body.code).eq(200)
        expect(res.body.data).have.property('id', 44)
        expect(res.body.data).have.property('name', 'Rameshwar Deshpande')
        expect(res.body.data).have.property(
          'email',
          'deshpande_rameshwar@dickens-cormier.name'
        )
        expect(res.body.data).have.property('status', 'Active')
        expect(res.body.data).have.property('gender', 'Female')
      })
    })

    it('Get details of a unexisting user', () => {
      cy.request({
        url: userEndPoint + '/10000',
      }).then((res) => {
        expect(res.status).eq(200)
        expect(res.body.code).eq(404)
        expect(res.body.data).have.property('message', 'Resource not found')
      })
    })
  })

  context('Update user details tests', () => {
    it('Update a user details successfully', () => {
      cy.request({
        method: 'PUT',
        url: userEndPoint + '/' + userUpdateID,
        headers: requestHeaders,
        body: {
          gender: 'Female',
          email: 'cy1@test.vn',
          status: 'Active',
        },
      }).then((res) => {
        expect(res.status).eq(200)
        expect(res.headers['content-encoding']).eq('gzip')
        expect(res.body.data.id).eq(userUpdateID)
        expect(res.body.data.email).eq('cy1@test.vn')
        expect(res.body.data.gender).eq('Female')
        expect(res.body.data.status).eq('Active')
      })
    })

    it('Update a user details with wrong gender', () => {
      cy.request({
        method: 'PUT',
        url: userEndPoint + '/' + userUpdateID,
        headers: requestHeaders,
        body: {
          gender: 'bac',
          email: 'cy1@test.vn',
          status: 'Active',
        },
      }).then((res) => {
        expect(res.status).eq(200)
        expect(res.body.code).eq(422)
        expect(res.headers).not.have.key('content-encoding')
        expect(res.body.data[0]).to.have.property('field', 'gender')
        expect(res.body.data[0]).to.have.property(
          'message',
          'can be Male or Female'
        )
      })
    })

    it('Update a user details with incorrect content-type', () => {
      cy.request({
        method: 'PUT',
        url: userEndPoint + '/' + userUpdateID,
        headers: {
          'content-type': 'incorrect type',
          Authorization: 'Bearer ' + accessToken,
        },
        body: requestBody,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).eq(406)
        expect(res.headers['content-type']).contains('text/html;')
      })
    })

    it('Update a user details without Authentication', () => {
      cy.request({
        method: 'PUT',
        url: userEndPoint + '/' + userUpdateID,
        headers: {
          'content-type': 'application/json',
        },
        body: requestBody,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).eq(200)
        expect(res.body.code).eq(401)
        expect(res.headers['content-type']).contain('application/json')
        expect(res.body.data.message).eq('Authentication failed')
      })
    })
  })

  context('Delete user tests', () => {
    var userID

    it('Delete an user successfully', () => {
      var body = {
        name: 'user2delete',
        email: 'email2delete@cypress.test',
        gender: 'Male',
        status: 'Active',
      }
      addUser(body).then((res) => {
        userID = res.body.data.id
        cy.log(userID)
        cy.request({
          method: 'DELETE',
          url: userEndPoint + '/' + userID,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((res) => {
          expect(res.status).eq(200)
          expect(res.body.code).eq(204)
          expect(res.body.meta).is.null
          expect(res.body.data).is.null
        })
      })
    })

    it('Delete an unexisting user', () => {
      cy.request({
        method: 'DELETE',
        url: userEndPoint + '/5000',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        expect(res.status).eq(200)
        expect(res.body.code).eq(404)
        expect(res.body.meta).is.null
        expect(res.body.data.message).eq('Resource not found')
      })
    })
  })
})
