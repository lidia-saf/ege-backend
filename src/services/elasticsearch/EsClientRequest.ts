import AWS from 'aws-sdk';
import elasticsearch, { DeleteDocumentParams } from 'elasticsearch';
import awsHttpClient from 'http-aws-es';
import AwsCredentials from '../../config/AwsCredentials';

class EsClientRequest {
    private readonly region = 'eu-central-1';
    public async sendRequestThroughClient(query: any) {
        AWS.config.region = this.region;
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
            client.search(query).then(function(resp: any) {
                console.log(resp);
                resolve(resp);
            }, function(err: Error) {
                console.log(`error getting data: ${err}`);
                reject(err);
            });
        })
    }

    public async update(params: any, sourceData: any) {
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
            client.update(params, sourceData).then(function(res: any) {
                console.log(res);
                resolve(res);
            }, function(err: Error) {
                console.log(`error putting data: ${err}`);
                reject(err)
            });
        })
    }

    public async get(params: any) {
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
            client.get(params).then(function(res: any) {
                console.log(res);
                resolve(res);
            }, function(err: Error) {
                console.log(`error putting data: ${err}`);
                reject(err)
            });
        })
    }

    public async delete(params: DeleteDocumentParams) {
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
            client.delete(params).then(function(res: any) {
                console.log(res);
                resolve(res);
            }, function(err: Error) {
                console.log(`error putting data: ${err}`);
                reject(err)
            });
        })
    }
}

export default new EsClientRequest;