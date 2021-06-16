"use strict";
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
const USER_POOL_ID = process.env.AWS_USER_POOL_ID;
const CLIENT_ID = process.env.AWS_CLIENT_ID;
const REGION = process.env.AWS_REGION;
const Auth = {
    valid: function (token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    region: REGION,
                    userPoolId: USER_POOL_ID,
                    debug: true
                };
                const claims = {
                    aud: CLIENT_ID
                };
                const Verifier = require('verify-cognito-token');
                const verifier = new Verifier(params, claims);
                let result = false;
                if (token) {
                    result = yield verifier.verify(token);
                }
                return result;
            }
            catch (error) {
                return false;
            }
        });
    }
};
exports.default = Auth;
//# sourceMappingURL=index.js.map