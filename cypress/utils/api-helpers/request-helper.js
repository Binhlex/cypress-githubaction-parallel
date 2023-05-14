export const RequestHelper = {
  sendGetRequest(endPoint, headers) {
    cy.request({
      method: 'GET',
      url: endPoint,
      headers: headers,
      failOnStatusCode: false,
    }).then((response) => {
      cy.wrap(response).as('response')
    })
  },

  sendPostRequest(endPoint, headers, body) {
    cy.request({
      method: 'POST',
      url: endPoint,
      headers: headers,
      body: body,
      failOnStatusCode: false,
    }).then((response) => {
      cy.wrap(response).as('response')
    })
  },

  sendPutRequest() {},

  sendPatchRequest() {},

  sendDeleteRequest(endPoint, headers, body) {
    cy.request({
      method: 'DELETE',
      url: endPoint,
      headers: headers,
      body: body,
      failOnStatusCode: false,
    }).then((response) => {
      cy.wrap(response).as('response')
    })
  },
}
