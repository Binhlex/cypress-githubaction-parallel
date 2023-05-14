// export class UserToken {
//
//     static userToken = {}
//
//     static setToken(authToken) {
//
//         UserToken.userToken = { Authorization: `Bearer ${authToken}` }
//         cy.log('Get AuthToken inconstructor  UserToken is ' + UserToken.userToken)
//         cy.log('Get AuthToken inconstructor  UserToken is ' + console.table(UserToken.userToken))
//     }
//
//     static getAuthToken() {
//         cy.log('Get AuthToken in UserToken is AAA ' + UserToken.userToken)
//         return UserToken.userToken
//     }
// }

export const getHeaders = (hasJsonBody = false, accessToken) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    // any other headers that are specific to a resource
  }
  if (hasJsonBody) {
    headers['Content-Type'] = 'application/json'
  }
  return headers
}
