import AWS from 'aws-sdk';
import { AWSCredentials } from './AwsCredentials';

let region = 'eu-central-1';
let domain = 'search-egedb-phvxanuibqbyc7r7itdlz2tkdi.eu-central-1.es.amazonaws.com';

type IRequestType = 'GET' | 'PUT' | 'POST' | 'DELETE';
interface IResponseData {
    statusCode: number,
    statusMessage: string,
    headers: any,
    body?: string
}

export class EsHttpRequest {
    public static handleRequest(requestType: IRequestType, path: string, body: Object) {
        let endpoint = new AWS.Endpoint(domain);
        let request = new AWS.HttpRequest(endpoint, region);

        request.method = requestType;
        request.path += path;
        request.body = JSON.stringify(body);
        request.headers['host'] = domain;
        request.headers['Content-Type'] = 'application/json';
        // @ts-ignore
        request.headers['Content-Length'] = Buffer.byteLength(request.body);

        let credentials = AWSCredentials.getCredentials();
        // @ts-ignore
        let signer = new AWS.Signers.V4(request, 'es');
        signer.addAuthorization(credentials, new Date());

        // @ts-ignore
        let client = new AWS.HttpClient();

        return new Promise((resolve, reject) => {
            client.handleRequest(request, null, function(response: any) {
                const { statusCode, statusMessage, headers } = response;
                let body = '';
                response.on('data', function(chunk: string) {
                    body += chunk;
                });
                response.on('end', function() {
                    const data: IResponseData = { statusCode, statusMessage, headers };
                    if (body) {
                        data.body = JSON.parse(body);
                    }
                    resolve(data);
                });
                }, function (error: Error) {
                    reject(error);
                }
            )
        })
    }
}