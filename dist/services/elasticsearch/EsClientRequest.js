"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const elasticsearch_1 = __importDefault(require("elasticsearch"));
const http_aws_es_1 = __importDefault(require("http-aws-es"));
const AwsCredentials_1 = __importDefault(require("../../config/AwsCredentials"));
class EsClientRequest {
    sendRequestThroughClient(query) {
        aws_sdk_1.default.config.region = 'eu-central-1';
        let client = new elasticsearch_1.default.Client({
            host: 'search-egedb-phvxanuibqbyc7r7itdlz2tkdi.eu-central-1.es.amazonaws.com',
            connectionClass: http_aws_es_1.default,
            // @ts-ignore
            amazonES: {
                region: 'eu-central-1',
                credentials: AwsCredentials_1.default.getCredentials()
            }
        });
        return new Promise((resolve, reject) => {
            client.search(query).then(function (resp) {
                console.log(resp);
                resolve(resp);
            }, function (err) {
                reject(err);
            });
        });
    }
}
exports.default = new EsClientRequest;
//# sourceMappingURL=EsClientRequest.js.map