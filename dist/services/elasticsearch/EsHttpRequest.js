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
const AwsCredentials_1 = __importDefault(require("../../config/AwsCredentials"));
let region = 'eu-central-1';
let domain = 'search-egedb-phvxanuibqbyc7r7itdlz2tkdi.eu-central-1.es.amazonaws.com';
const makeRequest = (requestType, path, body, endpoint, query) => {
    let request = new aws_sdk_1.default.HttpRequest(endpoint, region);
    request.method = requestType;
    request.path += `${path}${query.length !== 0 ? `?=${query}` : ''}`;
    request.body = JSON.stringify(body);
    request.headers['host'] = domain;
    request.headers['Content-Type'] = 'application/json';
    // @ts-ignore
    request.headers['Content-Length'] = Buffer.byteLength(request.body);
    return request;
};
const sendRequest = (request) => {
    // @ts-ignore
    let client = new aws_sdk_1.default.HttpClient();
    return new Promise((resolve, reject) => {
        client.handleRequest(request, null, function (response) {
            const { statusCode, statusMessage, headers } = response;
            let body = '';
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', function () {
                const data = { statusCode, statusMessage, headers };
                if (body) {
                    data.body = JSON.parse(body);
                }
                console.log(`request through HTTP success: ${body}`);
                resolve(body);
            });
        }, function (error) {
            console.log(`request through HTTP err: ${error}`);
            reject(error);
        });
    });
};
class EsHttpRequest {
    static handleRequest(requestType, path, body, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let endpoint = new aws_sdk_1.default.Endpoint(domain);
            let request = makeRequest(requestType, path, body, endpoint, query);
            let credentials = yield AwsCredentials_1.default.getCredentials();
            // @ts-ignore
            let signer = new aws_sdk_1.default.Signers.V4(request, 'es');
            signer.addAuthorization(credentials, new Date());
            return sendRequest(request);
        });
    }
}
exports.EsHttpRequest = EsHttpRequest;
//# sourceMappingURL=EsHttpRequest.js.map