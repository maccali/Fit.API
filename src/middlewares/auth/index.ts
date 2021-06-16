import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
// import Verifier from 'verify-cognito-token'

const USER_POOL_ID = process.env.AWS_USER_POOL_ID
const CLIENT_ID = process.env.AWS_CLIENT_ID
const REGION = process.env.AWS_REGION

// const Auth = {
//   valid: function (email, tokenId, tokenJWT) {
//     console.log('lll')
//     console.log('deb 01')
//     const AccessToken = new AmazonCognitoIdentity.CognitoAccessToken({ AccessToken: tokenJWT })
//     const IdToken = new AmazonCognitoIdentity.CognitoIdToken({ IdToken: tokenId })
//     //   const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: tokens.refreshToken })
//     console.log('deb 02')

//     const sessionData = {
//       IdToken: IdToken,
//       AccessToken: AccessToken
//       // RefreshToken: RefreshToken
//     }
//     console.log('deb 03')
//     var poolData = { UserPoolId: USER_POOL_ID, ClientId: CLIENT_ID }
//     console.log('deb 04')
//     var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
//     console.log('deb 05')

//     const userSession = new AmazonCognitoIdentity.CognitoUserSession(sessionData)
//     console.log('deb 06')

//     const userData = {
//       Username: email,
//       Pool: userPool
//     }
//     console.log('deb 07')

//     const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
//     console.log('deb 08')
//     cognitoUser.setSignInUserSession(userSession)

//     console.log('deb 09')
//     cognitoUser.getSession(function (err, session) {
//       console.log('err', err)
//       console.log('session', session)
//       // You must run this to verify that session (internally)
//       if (session.isValid()) {
//         // Update attributes or whatever else you want to do
//       } else {
//         // TODO: What to do if session is invalid?
//       }
//     })
//   }
// }

const Auth = {
  valid: async function (token) {
    try {
      // params
      const params = {
        region: REGION, // required
        userPoolId: USER_POOL_ID, // required
        debug: true // optional parameter to show console logs
      }

      //optional claims examples
      const claims = {
        aud: CLIENT_ID
        // email_verified: true,
        // auth_time: (time) => time <= 1524588564,
        // 'cognito:groups': (groups) => groups.includes('Admins')
      }
      const Verifier = require('verify-cognito-token')
      const verifier = new Verifier(params, claims)

      let result = false
      if (token) {
        result = await verifier.verify(token)
      }

      return result
    } catch (error) {
      return false
    }
  }
}

export default Auth
