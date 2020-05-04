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
const EsHttpRequest_1 = require("../elasticsearch/EsHttpRequest");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const elasticsearch_1 = __importDefault(require("elasticsearch"));
const http_aws_es_1 = __importDefault(require("http-aws-es"));
const AwsCredentials_1 = __importDefault(require("../../config/AwsCredentials"));
const EsClientRequest_1 = __importDefault(require("../elasticsearch/EsClientRequest"));
let index = 'testsdesc';
let type = '_doc';
class ESProvider {
    postDocToES(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield EsHttpRequest_1.EsHttpRequest.handleRequest('POST', `${index}/${type}`, document, '');
            return result;
        });
    }
    deleteDocFromES() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {
                index: 'testsdesc',
                body: {
                    query: {
                        match: { testId: "1" }
                    }
                }
            };
            aws_sdk_1.default.config.region = 'eu-central-1';
            let client = new elasticsearch_1.default.Client({
                host: 'search-egedb-phvxanuibqbyc7r7itdlz2tkdi.eu-central-1.es.amazonaws.com',
                connectionClass: http_aws_es_1.default,
                // @ts-ignore
                amazonES: {
                    region: 'eu-central-1',
                    credentials: yield AwsCredentials_1.default.getCredentials()
                }
            });
            client.deleteByQuery(query, function (_, response) {
                console.log(response);
            });
        });
    }
    getAllDataFromES() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield EsHttpRequest_1.EsHttpRequest.handleRequest('GET', `${index}/_search`, {}, '');
            console.log(result);
            return result;
        });
    }
    getTestDescById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                index: index,
                body: {
                    "size": 50,
                    "query": {
                        "term": { "testId": id }
                    },
                    "sort": [
                        { "testId": { "order": "asc" } }
                    ]
                }
            };
            const result = yield EsClientRequest_1.default.sendRequestThroughClient(query);
            return result;
        });
    }
}
exports.default = new ESProvider;
//# sourceMappingURL=TestDescriptionProvider.js.map