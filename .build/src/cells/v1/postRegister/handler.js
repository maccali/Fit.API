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
const auth_1 = __importDefault(require("./../../../middlewares/auth"));
aws_sdk_1.default.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
const CLIENT_ID = process.env.AWS_CLIENT_ID;
module.exports.post = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const token = event.headers.token ? event.headers.token : null;
    if (!(yield auth_1.default.valid(token))) {
        console.log('dasdas');
        return {
            statusCode: 403
        };
    }
    const { email, password } = JSON.parse(event.body);
    var authenticationData = {
        Username: email,
        Password: password
    };
    console.log('authenticationData', authenticationData);
    try {
        const cognitoProvider = new aws_sdk_1.default.CognitoIdentityServiceProvider();
        const signIn = yield cognitoProvider
            .signUp(Object.assign(Object.assign({}, authenticationData), { ClientId: CLIENT_ID }))
            .promise();
        console.log('signIn', signIn);
        return {
            statusCode: 200,
            body: JSON.stringify(signIn)
        };
    }
    catch (error) {
        return {
            statusCode: 500
        };
    }
});
//# sourceMappingURL=handler.js.map