'use strict'

import { v4 as uuid } from 'uuid'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import Auth from './../../../middlewares/auth'

const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const dynamodb = new AWS.DynamoDB.DocumentClient()

const TABLE_NAME = 'PSMeasurements'

module.exports.post = async (event: any) => {
  const { userId, measurements } = JSON.parse(event.body)

  const { token } = event.headers
  if (!(await Auth.valid(token))) {
    return {
      statusCode: 403
    }
  }
  console.log('token', token)
  console.log('Auth.valid(token)', Auth.valid(token))

  let putItemParams = {
    TableName: TABLE_NAME,
    Item: { id: uuid(), userId, measurements }
    // ReturnValues: 'ALL_OLD'
  }

  try {
    await dynamodb.put(putItemParams).promise()
    return {
      statusCode: 200,
      body: JSON.stringify(putItemParams.Item)
    }
  } catch (error) {
    return {
      statusCode: 500
    }
  }
}
