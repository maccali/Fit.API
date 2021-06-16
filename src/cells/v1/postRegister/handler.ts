'use strict'

import AWS from 'aws-sdk'
// import {AWSCognito} from 'amazon-cognito-identity-js'
import Auth from './../../../middlewares/auth'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

// const USER_POOL_ID = process.env.AWS_USER_POOL_ID
const CLIENT_ID = process.env.AWS_CLIENT_ID

module.exports.post = async (event: any) => {
  const token = event.headers.token ? event.headers.token : null
  if (!(await Auth.valid(token))) {
    console.log('dasdas')
    return {
      statusCode: 403
    }
  }
  const { email, password } = JSON.parse(event.body)

  var authenticationData = {
    Username: email,
    Password: password
  }

  console.log('authenticationData', authenticationData)

  try {
    const cognitoProvider = new AWS.CognitoIdentityServiceProvider()
    const signIn = await cognitoProvider
      .signUp({
        ...authenticationData,
        // UserPoolId: USERPOOLID,
        ClientId: CLIENT_ID
      })
      .promise()

    console.log('signIn', signIn)
    return {
      statusCode: 200,
      body: JSON.stringify(signIn)
    }
  } catch (error) {
    return {
      statusCode: 500
      // body: JSON.stringify(error)
    }
  }
}
