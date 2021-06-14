'use strict'

import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const dynamodb = new AWS.DynamoDB.DocumentClient()

const TABLE_NAME = 'PSMeasurements'

module.exports.get = async (event: any) => {
  console.log('event ->', event)

  const userId = String(event.pathParameters.userId)

  // const { measurementId } = JSON.parse(event.pathParameters as Object)
  console.log('userId', userId)
  const params = {
    // Get the table name from the environment variable
    TableName: TABLE_NAME,
    // Get all the rows where the userId is our hardcoded user id
    // KeyConditionExpression: 'userId = :userId',
    FilterExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  }

  console.log('params', params)

  try {
    const results = await dynamodb.scan(params).promise()

    const result = {
      statusCode: 200,
      body: JSON.stringify(results)
    }
    console.log('result', result)
    return result
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 500
    }
  }
}
