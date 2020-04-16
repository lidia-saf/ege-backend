import AWS from 'aws-sdk';

const chain = new AWS.CredentialProviderChain([
                function() { return new AWS.EnvironmentCredentials('AWS')},
                function() { return new AWS.EC2MetadataCredentials()}
            ]);


class AWSCredentials {
    public async getCredentials() {
        await AWS.config.getCredentials(function(err) {
            if (err) console.log(err.stack);
            else { 
                console.log("successfully got the credentials");
            }
        });

        // chain.resolve((err, cred) => {
        //     if (!err) {
        //         console.log('success: fully got credentials')
        //         AWS.config.credentials = cred;
        //     }
        //     console.error(`failure to get credentials: ${err}`);
        // });

        return AWS.config.credentials;
    }
}

export default new AWSCredentials();


