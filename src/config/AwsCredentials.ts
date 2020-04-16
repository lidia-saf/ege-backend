import AWS from 'aws-sdk';

const chain = new AWS.CredentialProviderChain([
                function() { return new AWS.EnvironmentCredentials('AWS')},
                function() { return new AWS.EC2MetadataCredentials()}
            ]);


class AWSCredentials {
    public async getCredentials() {
        await chain.resolve((err, cred) => {
            if (!err) {
                console.log('success: fully got credentials')
                AWS.config.credentials = cred;
            }
            console.error(`failure to get credentials: ${err}`);
        });

        return AWS.config.credentials;
    }
}

export default new AWSCredentials();


