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
const EsHttpRequest_1 = require("./EsHttpRequest");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const elasticsearch_1 = __importDefault(require("elasticsearch"));
const http_aws_es_1 = __importDefault(require("http-aws-es"));
const AwsCredentials_1 = __importDefault(require("../../config/AwsCredentials"));
const EsClientRequest_1 = __importDefault(require("./EsClientRequest"));
let index = 'tests';
let type = '_doc';
class ESProvider {
    postDocToES(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield EsHttpRequest_1.EsHttpRequest.handleRequest('POST', `${index}/${type}`, document, '');
            return result;
        });
    }
    getAllDataFromES(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object.keys(query).length) {
                const result = yield EsHttpRequest_1.EsHttpRequest.handleRequest('GET', `${index}/_search`, {}, '');
                return result;
            }
            let esQuery = {};
            if (query.sort === 'questionNumber') {
                esQuery = {
                    index: 'tests',
                    body: {
                        "from": 0,
                        "size": 5000,
                        "query": {
                            "match_all": {}
                        },
                        "sort": [
                            { "questionNumber": { "order": "asc" } }
                        ]
                    }
                };
            }
            else {
                esQuery = {
                    index: 'tests',
                    size: 5000,
                    body: {
                        "query": {
                            "match_all": {}
                        },
                        "sort": [
                            { "testId": { "order": "asc" } }
                        ]
                    }
                };
            }
            const result = yield EsClientRequest_1.default.sendRequestThroughClient(esQuery);
            return result;
        });
    }
    getQuestionsDataByTestId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                index: "tests",
                body: {
                    "size": 50,
                    "query": {
                        "term": { "testId": id }
                    },
                    "sort": [
                        { "questionNumber": { "order": "asc" } }
                    ]
                }
            };
            const result = yield EsClientRequest_1.default.sendRequestThroughClient(query);
            return result;
        });
    }
    getQuestionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {
                type: '_doc',
                index: 'tests',
                id
            };
            let result = yield EsClientRequest_1.default.get(params);
            return result;
        });
    }
    putQuestionById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let sourceData = {
                doc: data
            };
            let params = {
                id,
                index: 'tests',
                type: '_doc',
                body: sourceData
            };
            const result = yield EsClientRequest_1.default.update(params, sourceData);
            return result;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {
                id,
                index: 'tests',
                type: '_doc'
            };
            const result = yield EsClientRequest_1.default.delete(params);
            return result;
        });
    }
    getMaxTestValue() {
        return __awaiter(this, void 0, void 0, function* () {
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
            return new Promise((resolve, reject) => {
                client.search({
                    index: 'tests',
                    body: {
                        "size": 0,
                        "aggs": {
                            "maxTestId": {
                                "max": {
                                    "field": "testId"
                                }
                            }
                        }
                    }
                }).then(function (resp) {
                    resolve(resp["aggregations"]);
                }, function (err) {
                    reject(err);
                });
            });
        });
    }
}
exports.default = new ESProvider;
//# sourceMappingURL=ESProvider.js.map