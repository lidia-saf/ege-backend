"use strict";
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
        chain.resolve((err, cred) => {
            if (!err) {
                console.log('success: fully got credentials');
                aws_sdk_1.default.config.credentials = cred;
            }
            console.error(`failure to get credentials: ${err}`);
        });
        return aws_sdk_1.default.config.credentials;
    }
}
exports.default = new AWSCredentials();
//# sourceMappingURL=AwsCredentials.js.map