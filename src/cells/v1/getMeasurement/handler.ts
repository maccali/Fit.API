'use strict'

import AWS from 'aws-sdk'
import Auth from './../../../middlewares/auth'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const dynamodb = new AWS.DynamoDB.DocumentClient()

const TABLE_NAME = 'PSMeasurements'

module.exports.get = async (event: any) => {
  const { token } = event.headers
  if (!(await Auth.valid(token))) {
    return {
      statusCode: 403
    }
  }
  const measurementId = String(event.pathParameters.measurementId)

  // const { measurementId } = JSON.parse(event.pathParameters as Object)
  console.log('measurementId', measurementId)
  const params = {
    // Get the table name from the environment variable
    TableName: TABLE_NAME,
    // Get all the rows where the userId is our hardcoded user id
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': measurementId
    }
  }

  console.log('params', params)

  try {
    const results = await dynamodb.query(params).promise()
    console.log('results', results)

    return {
      statusCode: 200,
      body: JSON.stringify(results.Items[0])
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 500
    }
  }
}
