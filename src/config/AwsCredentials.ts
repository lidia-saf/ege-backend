import AWS from 'aws-sdk';

const chain = new AWS.CredentialProviderChain([
                function() { return new AWS.EnvironmentCredentials('AWS')},
                function() { return new AWS.EC2MetadataCredentials()}
            ]);


class AWSCredentials {
    public getCredentials() {
        chain.resolve((err, cred) => {
            if (!err) {
                AWS.config.credentials = cred;
            }
        });

        return AWS.config.credentials;
    }
}

export default new AWSCredentials();


