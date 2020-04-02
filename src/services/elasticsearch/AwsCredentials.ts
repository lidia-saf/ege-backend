import AWS, { Credentials } from 'aws-sdk';

export class AWSCredentials {
    public static credentials: Credentials | null = null;

    public static getCredentials() {
        const chain = new AWS.CredentialProviderChain([
            function() { return new AWS.EnvironmentCredentials('AWS')},
            function() { return new AWS.EC2MetadataCredentials()}
        ]);

        chain.resolve((err, cred) => {
            console.log(cred);
            if (!err) {
                AWS.config.credentials = cred;
            }
        });

        return AWS.config.credentials;
    }
}