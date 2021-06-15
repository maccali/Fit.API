'use strict'

import AWS from 'aws-sdk'
// import AWSCognito from 'amazon-cognito-identity-js'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const USERPOOLID = 'us-east-1_dv6kztdZA'
const CLIENTID = '77hinpirsu99d5f5qa96tcrk8u'

module.exports.post = async (event: any) => {
  console.log('event ->', event)

  const { email, password } = JSON.parse(event.body)
  // console.log("body", /)

  var authenticationData = {
    Username: email,
    Password: password
  }

  console.log('authenticationData', authenticationData)

  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData)

  var poolData = { UserPoolId: USERPOOLID, ClientId: CLIENTID }
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

  var userData = {
    Username: email,
    Pool: userPool
  }

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
  const cog = await new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken()
        console.log('result =>', result)
        resolve({
          statusCode: 200,
          body: JSON.stringify(accessToken)
        })
        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
        // var idToken = result.idToken.jwtToken
      },

      onFailure: function (err) {
        console.log('err =>', err)
        reject({
          statusCode: 500
          // body: JSON.stringify(error)
        })
        // alert(err)
      }
    })
  })

  return cog
}
