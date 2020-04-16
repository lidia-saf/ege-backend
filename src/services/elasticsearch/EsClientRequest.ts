import AWS from 'aws-sdk';
import elasticsearch from 'elasticsearch';
import awsHttpClient from 'http-aws-es';
import AwsCredentials from '../../config/AwsCredentials';

class EsClientRequest {
    public sendRequestThroughClient(query: any) {
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
            client.search(query).then(function(resp: any) {
                console.log(resp);
                resolve(resp);
            }, function(err: Error) {
                console.log(`error getting data: ${err}`);
                reject(err);
            });
        })
    }
}

export default new EsClientRequest;