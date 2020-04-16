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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const chain = new aws_sdk_1.default.CredentialProviderChain([
    function () { return new aws_sdk_1.default.EnvironmentCredentials('AWS'); },
    function () { return new aws_sdk_1.default.EC2MetadataCredentials(); }
]);
class AWSCredentials {
    getCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            yield chain.resolve((err, cred) => {
                if (!err) {
                    console.log('success: fully got credentials');
                    aws_sdk_1.default.config.credentials = cred;
                }
                console.error(`failure to get credentials: ${err}`);
            });
            return aws_sdk_1.default.config.credentials;
        });
    }
}
exports.default = new AWSCredentials();
//# sourceMappingURL=AwsCredentials.js.map