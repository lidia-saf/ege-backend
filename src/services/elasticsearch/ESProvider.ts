import { EsHttpRequest } from './EsHttpRequest';
import AWS from 'aws-sdk';
import elasticsearch from 'elasticsearch';
import awsHttpClient from 'http-aws-es';
import AwsCredentials from '../../config/AwsCredentials';
import EsClientRequest from './EsClientRequest';

let index = 'tests';
let type = '_doc';

class ESProvider {
    public postDocToES(document: JSON) {
        return EsHttpRequest.handleRequest('POST', `${index}/${type}`, document, '');
    }

    public getAllDataFromES(query: any) {

        if (!Object.keys(query).length) {
            return EsHttpRequest.handleRequest('GET', `${index}/_search`, {}, '');
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
       return EsClientRequest.sendRequestThroughClient(esQuery);
    }

    public getQuestionsDataByTestId(id: string) {
        const query = {
            index: "tests",
            body: {
                "query": {
                    "term" : { "testId" : id }
                },
                "sort": [
                    {"questionNumber": {"order": "asc"}}
                ]
            }
        }

        return EsClientRequest.sendRequestThroughClient(query);
    }

    public getMaxTestValue() {
        AWS.config.region = 'eu-central-1';
        let client = new elasticsearch.Client({
            host: 'search-egedb-phvxanuibqbyc7r7itdlz2tkdi.eu-central-1.es.amazonaws.com',
            connectionClass: awsHttpClient,
            // @ts-ignore
            amazonES: {
                region: 'eu-central-1',
                credentials: AwsCredentials.getCredentials()
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
