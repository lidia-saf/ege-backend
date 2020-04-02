import { EsHttpRequest } from './EsHttpRequest';

let index = 'tests';
let type = '_doc';

export class ESProvider {
    public static postDocToES(document: JSON) {
        return EsHttpRequest.handleRequest('POST', `${index}/${type}`, document);
    }

    public static getAllDataFromES() {
        return EsHttpRequest.handleRequest('GET', `${index}/_search`, {});
    }
}
