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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'PSMeasurements';
module.exports.post = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, measurements } = JSON.parse(event.body);
    let putItemParams = {
        TableName: TABLE_NAME,
        Item: { id: uuid_1.v4(), userId, measurements }
    };
    try {
        yield dynamodb.put(putItemParams).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(putItemParams.Item)
        };
    }
    catch (error) {
        return {
            statusCode: 500
        };
    }
});
//# sourceMappingURL=handler.js.map