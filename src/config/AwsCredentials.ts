import AWS from 'aws-sdk';

class AWSCredentials {
    public readonly credentials: AWS.EC2MetadataCredentials;

    constructor() {
        this.credentials = new AWS.EC2MetadataCredentials({
            httpOptions: {timeout: 5000}
        })
    }

    public async getCredentials() {
        return this.credentials;
    }
}

export default new AWSCredentials();


