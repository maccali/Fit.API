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
  const { userId, measureTime, measurements } = JSON.parse(event.body)

  const { token } = event.headers
  if (!(await Auth.valid(token))) {
    return {
      statusCode: 403
    }
  }
  console.log('token', token)
  console.log('Auth.valid(token)', Auth.valid(token))

  const startTime = new Date(measurements[0].time)
  console.log('startTime', startTime)
  const endTime = new Date(measurements[measurements.length - 1].time)
  console.log('endTime', endTime)

  const minutes = (endTime - startTime) / (1000 * 60)
  // const bpm = measurements.length / minutes
  const numberOfBpmMeasurements = measurements.length
  let sumBpms = 0
  const seconds = (endTime - startTime) / ((1000 * 60) / 60)
  const hours = (endTime - startTime) / (((1000 * 60) / 60) * 60 * 60)
  console.log('minutes', minutes)

  let mapingTime = []

  measurements.forEach((item) => {
    sumBpms = sumBpms + item.bpm
    const dateItem = new Date(item.time)
    const mapYear = dateItem.getFullYear()
    const mapMonth = dateItem.getMonth() + 1
    const mapDay = dateItem.getDay()
    const mapHours = dateItem.getHours()
    const mapMinutes = dateItem.getMinutes()
    const mapIdentify = `${mapYear}-${mapMonth}-${mapDay}T${mapHours}:${mapMinutes}`

    if (mapingTime[mapIdentify]) {
      mapingTime[mapIdentify].push(item)
    } else {
      mapingTime[mapIdentify] = []
      mapingTime[mapIdentify].push(item)
    }
  })

  const beatsPerMinute = []
  const bpm = sumBpms / numberOfBpmMeasurements

  const beatMinutes = Object.keys(mapingTime)

  beatMinutes.forEach((item) => {
    const numberOfMeasures = mapingTime[item].length
    let sumBpmInMinute = 0
    mapingTime[item].forEach((element) => {
      sumBpmInMinute = sumBpmInMinute + element.bpm
    })
    beatsPerMinute.push({ identifier: item, bpm: sumBpmInMinute / numberOfMeasures })
  })

  const data = {
    id: uuid(),
    measureTime,
    bpm,
    measurementTimeMinutes: minutes,
    measurementTimeSeconds: seconds,
    measurementTimeHours: hours,
    userId,
    createdAt: new Date().toISOString(),
    measurements,
    beatsPerMinute
  }

  console.log('DATA =>', data)

  let putItemParams = {
    TableName: TABLE_NAME,
    Item: data
    // ReturnValues: 'ALL_OLD'
  }

  console.log('putItemParams =>', putItemParams)
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
