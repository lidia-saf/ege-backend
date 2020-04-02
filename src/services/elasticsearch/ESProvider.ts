import { EsHttpRequest } from './EsHttpRequest';

let index = 'tests';
let type = '_doc';

class ESProvider {
    public postDocToES(document: JSON) {
        return EsHttpRequest.handleRequest('POST', `${index}/${type}`, document);
    }

    public getAllDataFromES() {
        return EsHttpRequest.handleRequest('GET', `${index}/_search`, {});
    }
}

export default new ESProvider;
