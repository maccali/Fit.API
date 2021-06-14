'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
const dynamodb = new aws_sdk_1.default.DynamoDB.DocumentClient();
const TABLE_NAME = 'PSMeasurements';
module.exports.get = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('event ->', event);
    const measurementId = String(event.pathParameters.measurementId);
    console.log('measurementId', measurementId);
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': measurementId
        }
    };
    console.log('params', params);
    try {
        const results = yield dynamodb.query(params).promise();
        console.log('results', results);
        return {
            statusCode: 200,
            body: JSON.stringify(results.Items[0])
        };
    }
    catch (error) {
        console.log('error', error);
        return {
            statusCode: 500
        };
    }
});
//# sourceMappingURL=handler.js.map