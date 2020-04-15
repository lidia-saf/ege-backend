"use strict";
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
        return EsHttpRequest_1.EsHttpRequest.handleRequest('POST', `${index}/${type}`, document, '');
    }
    getAllDataFromES(query) {
        if (!Object.keys(query).length) {
            return EsHttpRequest_1.EsHttpRequest.handleRequest('GET', `${index}/_search`, {}, '');
        }
        let esQuery = {};
        if (query.sort === 'questionNumber') {
            esQuery = {
                index: 'tests',
                body: {
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
        return EsClientRequest_1.default.sendRequestThroughClient(esQuery);
    }
    getQuestionsDataByTestId(id) {
        const query = {
            index: "tests",
            body: {
                "query": {
                    "term": { "testId": id }
                },
                "sort": [
                    { "questionNumber": { "order": "asc" } }
                ]
            }
        };
        return EsClientRequest_1.default.sendRequestThroughClient(query);
    }
    getMaxTestValue() {
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
    }
}
exports.default = new ESProvider;
//# sourceMappingURL=ESProvider.js.map