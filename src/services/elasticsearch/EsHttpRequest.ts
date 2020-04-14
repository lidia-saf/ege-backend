import AWS, { Endpoint, HttpRequest } from 'aws-sdk';
import awsCredentials from '../../config/AwsCredentials';

let region = 'eu-central-1';
let domain = 'search-egedb-phvxanuibqbyc7r7itdlz2tkdi.eu-central-1.es.amazonaws.com';

type IRequestType = 'GET' | 'PUT' | 'POST' | 'DELETE';
interface IResponseData {
    statusCode: number,
    statusMessage: string,
    headers: any,
    body?: string
}

const makeRequest = (requestType: IRequestType, path: string, body: Object, endpoint: Endpoint, query: string) => {
    let request = new AWS.HttpRequest(endpoint, region);

    request.method = requestType;
    request.path += `${path}${query.length !== 0 ? `?=${query}` : ''}`;
    request.body = JSON.stringify(body);
    request.headers['host'] = domain;
    request.headers['Content-Type'] = 'application/json';
    // @ts-ignore
    request.headers['Content-Length'] = Buffer.byteLength(request.body);

    return request;
}

const sendRequest = (request: HttpRequest) => {
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
                 resolve(body);
             });
             }, function (error: Error) {
                 reject(error);
             }
         )
     })
}

export class EsHttpRequest {
    public static handleRequest(requestType: IRequestType, path: string, body: Object, query: string) {
        let endpoint = new AWS.Endpoint(domain);
        let request = makeRequest(requestType, path, body, endpoint, query);

        let credentials = awsCredentials.getCredentials();
        // @ts-ignore
        let signer = new AWS.Signers.V4(request, 'es');
        signer.addAuthorization(credentials, new Date());

        return sendRequest(request);
    }
}
