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
    const userId = String(event.pathParameters.userId);
    console.log('userId', userId);
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    };
    console.log('params', params);
    try {
        const results = yield dynamodb.scan(params).promise();
        const result = {
            statusCode: 200,
            body: JSON.stringify(results)
        };
        console.log('result', result);
        return result;
    }
    catch (error) {
        console.log('error', error);
        return {
            statusCode: 500
        };
    }
});
//# sourceMappingURL=handler.js.map