import { EsHttpRequest } from '../elasticsearch/EsHttpRequest';
import AWS from 'aws-sdk';
import elasticsearch from 'elasticsearch';
import awsHttpClient from 'http-aws-es';
import AwsCredentials from '../../config/AwsCredentials';
import EsClientRequest from '../elasticsearch/EsClientRequest';

let index = 'testsdesc';
let type = '_doc';

class ESProvider {
    public async postDocToES(document: JSON) {
        const result = await EsHttpRequest.handleRequest('POST', `${index}/${type}`, document, '');
        return result;
    }

    public async deleteDocFromES() {
        let query = {
            index: 'testsdesc',
            body: {
               query: {
                   match: { testId: "1" }
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

    public async getAllDataFromES() {
        const result = await EsHttpRequest.handleRequest('GET', `${index}/_search`, {}, '');
        console.log(result);
        return result;
    }

    public async getTestDescById(id: string) {
        const query = {
            index: index,
            body: {
                "size": 50,
                "query": {
                    "term" : { "testId" : id }
                },
                "sort": [
                    {"testId": {"order": "asc"}}
                ]
            }
        }
        const result = await EsClientRequest.sendRequestThroughClient(query);
        return result;
    }
}

export default new ESProvider;
