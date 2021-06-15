'use strict'

import AWS from 'aws-sdk'
// import {AWSCognito} from 'amazon-cognito-identity-js'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const USERPOOLID = 'us-east-1_dv6kztdZA'
const CLIENTID = '77hinpirsu99d5f5qa96tcrk8u'

module.exports.post = async (event: any) => {
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
        ClientId: CLIENTID
      })
      .promise()

    console.log('signIn', signIn)
    return {
      statusCode: 200,
      body: JSON.stringify(signIn)
    }
  } catch (error) {
    return {
      statusCode: 500,
      // body: JSON.stringify(error)
    }
  }
}
