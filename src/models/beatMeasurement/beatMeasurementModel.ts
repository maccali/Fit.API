import dynamoose from 'dynamoose'
import { SchemaDefinition } from 'dynamoose/dist/Schema'

// dynamoose.aws.sdk.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION
// })

export enum BeatMeasurementModelIndexes {
  userId = 'UserIdIndex'
}

const schema: SchemaDefinition = {
  id: {
    type: String,
    required: true,
    hashKey: true,
    index: [
      {
        global: true,
        name: BeatMeasurementModelIndexes.userId,
        rangeKey: 'userId'
      }
    ]
  },
  userId: {
    type: String,
    required: true
  },
  measurements: {
    type: Array,
    required: true
  }
}

export const BeatMeasurementModel = dynamoose.model<any>(
  'BeatMeasurement',
  new dynamoose.Schema(schema, { timestamps: true }),
  {
    throughput: 'ON_DEMAND'
  }
)
