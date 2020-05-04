import { EsHttpRequest } from './EsHttpRequest';
import AWS from 'aws-sdk';
import elasticsearch from 'elasticsearch';
import awsHttpClient from 'http-aws-es';
import AwsCredentials from '../../config/AwsCredentials';
import EsClientRequest from './EsClientRequest';

let index = 'tests';
let type = '_doc';

class ESProvider {
    public async postDocToES(document: JSON) {
        const result = await EsHttpRequest.handleRequest('POST', `${index}/${type}`, document, '');
        return result;
    }

    public async deleteDocFromES() {
        let query = {
            index: 'tests',
            body: {
               query: {
                   match: { testId: 3 }
               }
            }
        }
        
        AWS.config.region = 'eu-central-1';
        let client = new elasticsearch.Client({
            host: 'search-egedb-phvxanuibqbyc7r7itdlz2tkdi.eu-central-1.es.amazonaws.com',
            connectionClass: awsHttpClient,
            // @ts-ignore
            amazonES: {
                region: 'eu-central-1',
                credentials: await AwsCredentials.getCredentials()
            }
        });
        
        client.deleteByQuery(query, function (_: Error, response: any) {
            console.log(response);
        });
    }

    public async getAllDataFromES(query: any) {

        if (!Object.keys(query).length) {
            const result = await EsHttpRequest.handleRequest('GET', `${index}/_search`, {}, '');
            return result;
        }

        let esQuery = {};
        if (query.sort === 'questionNumber') {
            esQuery = {
                index: 'tests',
                body: {
                    "from": 0,
                    "size": 50,
                    "query": {
                        "match_all": {}
                    },
                    "sort": [
                        {"questionNumber": {"order": "asc"}}
                    ]
                }
            };
        } else {
            esQuery = {
                index: 'tests',
                body: {
                    "query": {
                        "match_all": {}
                    },
                    "sort": [
                        {"testId": {"order": "asc"}}
                    ]
                }
            };
        }

        const result = await EsClientRequest.sendRequestThroughClient(esQuery);
        return result;
    }

    public async getQuestionsDataByTestId(id: string) {
        const query = {
            index: "tests",
            body: {
                "size": 50,
                "query": {
                    "term" : { "testId" : id }
                },
                "sort": [
                    {"questionNumber": {"order": "asc"}}
                ]
            }
        }
        const result = await EsClientRequest.sendRequestThroughClient(query);
        return result;
    }

    public async getMaxTestValue() {
        AWS.config.region = 'eu-central-1';
        let client = new elasticsearch.Client({
            host: 'search-egedb-phvxanuibqbyc7r7itdlz2tkdi.eu-central-1.es.amazonaws.com',
            connectionClass: awsHttpClient,
            // @ts-ignore
            amazonES: {
                region: 'eu-central-1',
                credentials: await AwsCredentials.getCredentials()
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
            }).then(function(resp: any) {
                resolve(resp["aggregations"]);
            }, function(err: Error) {
                reject(err);
            });
    })
    }
}

export default new ESProvider;
